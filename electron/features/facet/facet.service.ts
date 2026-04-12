// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BrowserWindow } from 'electron';
import { FacetNote, FacetNotebook } from '../../../shared/types/facet.type.js';
import {
    getNameFromPath,
    getParentRelativePath,
    isMarkdownFile,
    toRelativeFacetPath,
} from '../../utils/path.utils.js';
import { FacetScanService } from './facet-scan.service.js';
import chokidar, { FSWatcher } from 'chokidar';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import matter from 'gray-matter';

export class FacetService {
    private notes: Map<string, FacetNote>;
    private notebooks: Map<string, FacetNotebook>;
    private watcher: FSWatcher | null = null;

    constructor(
        private facetPath: string,
        private win: BrowserWindow,
    ) {
        this.notes = new Map();
        this.notebooks = new Map();
    }

    async openFacet(): Promise<{
        notes: FacetNote[];
        notebooks: FacetNotebook[];
    }> {
        if (this.watcher) {
            await this.watcher.close();
            this.watcher = null;
        }

        await FacetScanService.scanDisk(this.facetPath, this);

        this.watcher = chokidar.watch(this.facetPath, {
            persistent: true,
            ignored: (path, stats) => {
                if (!stats) return false; // not yet known, don't ignore
                if (stats.isDirectory()) return false;
                return !isMarkdownFile(path);
            },
            awaitWriteFinish: {
                stabilityThreshold: 300,
                pollInterval: 50,
            },
            ignoreInitial: true,
            atomic: true,
        });

        this.watcher.on('add', async (absolutePath) => {
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            if ([...this.notes.values()].find((n) => n.path === relativePath)) return;

            const [frontMatter, fileStat] = await Promise.all([
                FacetScanService.readFrontmatter(absolutePath),
                stat(absolutePath),
            ]);
            const note: FacetNote = {
                id: frontMatter?.id ?? randomUUID(),
                name: getNameFromPath(relativePath),
                path: relativePath,
                parentPath: getParentRelativePath(relativePath),
                createdAt: fileStat.birthtime,
                modifiedAt: fileStat.mtime,
            };
            await FacetScanService.handleDuplicateId(this.facetPath, this, note, absolutePath);

            if (!frontMatter) {
                const content = await readFile(absolutePath, { encoding: 'utf-8' });

                const parsed = matter(content);
                await writeFile(absolutePath, matter.stringify(parsed.content, { id: note.id }));
            }

            this.addNote(note);
            this.push('facet:note-added', note);
        });

        this.watcher.on('unlink', (absolutePath) => {
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            const note = [...this.notes.values()].find((n) => n.path === relativePath);
            if (!note) return;
            this.removeNote(note.id);
            this.push('facet:note-removed', note.id);
        });

        this.watcher.on('change', async (absolutePath) => {
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            const note = [...this.notes.values()].find((n) => n.path === relativePath);
            if (!note) return;
            const fileStat = await stat(absolutePath);
            const updated = { ...note, modifiedAt: fileStat.mtime };
            this.addNote(updated);
            this.push('facet:note-changed', updated);
        });

        this.watcher.on('addDir', (absolutePath) => {
            if (absolutePath === this.facetPath) return; // ignore root
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            const notebook: FacetNotebook = {
                name: getNameFromPath(relativePath),
                path: relativePath,
                parentPath: getParentRelativePath(relativePath),
            };
            this.addNotebook(notebook);
            this.push('facet:notebook-added', notebook);
        });

        this.watcher.on('unlinkDir', (absolutePath) => {
            if (absolutePath === this.facetPath) return;
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            this.removeNotebook(relativePath);
            this.push('facet:notebook-removed', relativePath);
        });

        return {
            notes: [...this.notes.values()],
            notebooks: [...this.notebooks.values()],
        };
    }

    private push(channel: string, data: unknown) {
        if (!this.win.isDestroyed()) {
            this.win.webContents.send(channel, data);
        }
    }

    async closeFacet(): Promise<void> {
        if (!this.watcher) return;

        await this.watcher.close();
    }

    getFacetPath(): string {
        return this.facetPath;
    }

    getNotes(): ReadonlyMap<string, FacetNote> {
        return this.notes;
    }

    getNotebooks(): ReadonlyMap<string, FacetNotebook> {
        return this.notebooks;
    }

    addNotebook(notebook: FacetNotebook) {
        this.notebooks.set(notebook.path, notebook);
    }

    getNotebook(path: string) {
        return this.notebooks.get(path);
    }

    removeNotebook(path: string) {
        this.notebooks.delete(path);
    }

    addNote(note: FacetNote) {
        this.notes.set(note.id, note);
    }

    getNote(id: string) {
        return this.notes.get(id);
    }

    removeNote(id: string) {
        this.notes.delete(id);
    }
}
