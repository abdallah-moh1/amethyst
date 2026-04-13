// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { open, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import {
    getNameFromPath,
    getParentRelativePath,
    isHiddenPath,
    isMarkdownFile,
    normalizeRelativePath,
    toAbsoluteFacetPath,
} from '../../utils/path.utils.js';
import { FacetService } from './facet.service.js';
import { FacetNote, FacetNotebook } from '../../../shared/types/facet.type.js';
import matter from 'gray-matter';
import { randomUUID } from 'node:crypto';

export class FacetScanService {
    static async scanDisk(facetPath: string, facetService: FacetService): Promise<void> {
        const entries = await readdir(facetPath, {
            recursive: true,
            withFileTypes: true,
        });

        for (const dirent of entries) {
            const fullPath = join(dirent.parentPath, dirent.name);
            const relativePath = normalizeRelativePath(relative(facetPath, fullPath));

            if (isHiddenPath(relativePath)) {
                continue;
            }

            if (dirent.isDirectory()) {
                const notebook: FacetNotebook = {
                    name: getNameFromPath(relativePath),
                    path: relativePath,
                    parentPath: getParentRelativePath(relativePath),
                };

                facetService.addNotebook(notebook);
            } else if (dirent.isFile() && isMarkdownFile(relativePath)) {
                const [frontMatter, fileStat] = await Promise.all([
                    this.readFrontmatter(fullPath),
                    stat(fullPath),
                ]);

                const note: FacetNote = {
                    // If the note doesn't have frontmatter metadata create a new id for it
                    id: frontMatter ? frontMatter.id : randomUUID(),
                    name: getNameFromPath(relativePath),
                    path: relativePath,
                    parentPath: getParentRelativePath(relativePath),
                    createdAt: fileStat.birthtime,
                    modifiedAt: fileStat.mtime,
                };

                const existingNote = facetService.getNote(note.id);
                await this.handleDuplicateId(facetPath, facetService, note, fullPath);

                if (
                    !frontMatter ||
                    (existingNote && existingNote.createdAt.getTime() > note.createdAt.getTime())
                ) {
                    const content = await readFile(fullPath, { encoding: 'utf-8' });
                    const parsed = matter(content);
                    await writeFile(fullPath, matter.stringify(parsed.content, { id: note.id }));
                }

                facetService.addNote(note);
            }
        }
    }

    static async readFrontmatter(absolutePath: string): Promise<{ id: string } | null> {
        const fd = await open(absolutePath);
        try {
            // read first 512 bytes — enough for any frontmatter block
            const buffer = Buffer.alloc(128);
            await fd.read(buffer, 0, 128, 0);
            const chunk = buffer.toString('utf-8');
            const parsed = matter(chunk);
            return parsed.data.id ? { id: parsed.data.id } : null;
        } finally {
            await fd.close();
        }
    }

    static async handleDuplicateId(
        facetPath: string,
        facetService: FacetService,
        note: FacetNote,
        fullPath: string,
    ): Promise<void> {
        const existingNote = facetService.getNote(note.id);
        if (!existingNote) return;

        const timeDifference = existingNote.createdAt.getTime() - note.createdAt.getTime();

        if (timeDifference > 0) {
            // The existing note is newer — reassign it a new id
            const existingNoteAbsPath = toAbsoluteFacetPath(facetPath, existingNote.path);
            const content = await readFile(existingNoteAbsPath, { encoding: 'utf-8' });

            const newId = randomUUID();
            const parsed = matter(content);
            await writeFile(existingNoteAbsPath, matter.stringify(parsed.content, { id: newId }));

            existingNote.id = newId;
            facetService.removeNote(note.id);
            facetService.addNote(existingNote);
        } else if (timeDifference < 0) {
            // The existing note is older — reassign the new note a new id
            note.id = randomUUID();
        }

        if (timeDifference < 0) {
            const content = await readFile(fullPath, { encoding: 'utf-8' });
            const parsed = matter(content);
            await writeFile(fullPath, matter.stringify(parsed.content, { id: note.id }));
        }
    }
}
