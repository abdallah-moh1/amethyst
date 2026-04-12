// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { randomUUID } from "node:crypto";
import { ParentPath, FacetNote } from "../../../shared/types/facet.type.js";
import { joinRelativePath, pathExists, toAbsoluteFacetPath } from "../../utils/path.utils.js";
import { FacetService } from "../facet/facet.service.js";
import { readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import matter from "gray-matter";

export class NoteService {
    constructor(private facetPath: string, private facetService: FacetService) { }

    async createNote(name: string, parentPath: ParentPath): Promise<FacetNote> {
        const notePath = parentPath ? joinRelativePath(parentPath, name) : name;
        const absolutePath = this.getAbsolutePath(notePath);
        if (await pathExists(absolutePath)) {
            throw new Error(`A note named "${name}" already exists here`);
        }
        const id = randomUUID();

        await writeFile(absolutePath, matter.stringify("", { id }), { encoding: 'utf-8' });

        const noteStat = await stat(absolutePath);

        const createdNote = {
            id,
            createdAt: noteStat.birthtime,
            modifiedAt: noteStat.mtime,
            name,
            parentPath,
            path: notePath
        };

        this.facetService.addNote(createdNote);


        return createdNote;
    }

    async openNote(id: string): Promise<string> {
        const note = this.facetService.getNote(id);

        if (!note) throw new Error(`A note with ${id} doesn't exist`);

        const content = await readFile(this.getAbsolutePath(note.path), { encoding: 'utf-8' });

        return matter(content).content;
    }

    async saveNote(id: string, content: string) {
        const note = this.facetService.getNote(id);

        if (!note) throw new Error(`A note with ${id} doesn't exist`);

        const absolutePath = this.getAbsolutePath(note.path);
        await writeFile(absolutePath, matter.stringify(content, { id }), { encoding: 'utf-8' });

        const noteStat = await stat(absolutePath);

        this.facetService.addNote({
            ...note,
            modifiedAt: noteStat.mtime,
        });

    }

    async renameNote(id: string, newName: string) {
        const note = this.facetService.getNote(id);

        if (!note) throw new Error(`A note with ${id} doesn't exist`);

        const absolutePath = this.getAbsolutePath(note.path);
        const newPath = note.parentPath ? joinRelativePath(note.parentPath, newName) : newName;

        if (await pathExists(this.getAbsolutePath(newPath))) {
            throw new Error(`A note named "${newName}" already exists here`);
        }

        await rename(absolutePath, this.getAbsolutePath(newPath));

        const noteStat = await stat(this.getAbsolutePath(newPath));

        this.facetService.addNote({
            ...note,
            name: newName,
            path: newPath,
            modifiedAt: noteStat.mtime,
        });
    }

    async moveNote(id: string, newParentPath: ParentPath) {
        const note = this.facetService.getNote(id);

        if (!note) throw new Error(`A note with ${id} doesn't exist`);

        const absolutePath = this.getAbsolutePath(note.path);
        const newPath = newParentPath ? joinRelativePath(newParentPath, note.name) : note.name;

        if (await pathExists(this.getAbsolutePath(newPath))) {
            throw new Error(`A note named "${note.name}" already exists here`);
        }

        await rename(absolutePath, this.getAbsolutePath(newPath));

        const noteStat = await stat(this.getAbsolutePath(newPath));

        this.facetService.addNote({
            ...note,
            path: newPath,
            parentPath: newParentPath,
            modifiedAt: noteStat.mtime,
        });
    }

    async deleteNote(id: string) {
        const note = this.facetService.getNote(id);

        if (!note) throw new Error(`A note with ${id} doesn't exist`);

        await rm(this.getAbsolutePath(note.path));

        this.facetService.removeNote(id);
    }

    private getAbsolutePath(path: string): string {
        return toAbsoluteFacetPath(this.facetPath, path);
    }
}