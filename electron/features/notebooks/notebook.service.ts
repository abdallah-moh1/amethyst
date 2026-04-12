// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, FacetNotebook, ParentPath } from "../../../shared/types/facet.type.js";
import { getNameFromPath, getParentRelativePath, joinRelativePath, pathExists, replacePrefix, toAbsoluteFacetPath } from "../../utils/path.utils.js";
import { FacetService } from "../facet/facet.service.js";
import { mkdir, rename, rm } from "node:fs/promises";

export class NotebookService {
    constructor(private facetPath: string, private facetService: FacetService) { }

    async createNotebook(parentPath: ParentPath, name: string): Promise<FacetNotebook> {
        const notebookPath = parentPath ? joinRelativePath(parentPath, name) : name;

        if (await pathExists(this.getAbsolutePath(notebookPath))) {
            throw new Error(`A notebook named "${name}" already exists here`);
        }

        await mkdir(this.getAbsolutePath(notebookPath));

        const createdNotebook = {
            name,
            parentPath,
            path: notebookPath
        };

        this.facetService.addNotebook(createdNotebook);

        return createdNotebook;
    }

    async renameNotebook(notebookPath: string, newName: string): Promise<FacetNotebook> {
        const parentPath = getParentRelativePath(notebookPath);
        const newPath = parentPath ? joinRelativePath(parentPath, newName) : newName;

        if (await pathExists(this.getAbsolutePath(newPath))) {
            throw new Error(`A notebook named "${newName}" already exists here`);
        }

        await rename(this.getAbsolutePath(notebookPath), this.getAbsolutePath(newPath));

        const renamedNotebook = {
            name: newName,
            parentPath,
            path: newPath
        };

        this.facetService.removeNotebook(notebookPath);
        this.updateChildren(notebookPath, newPath);
        this.facetService.addNotebook(renamedNotebook);

        return renamedNotebook;
    }

    async moveNotebook(notebookPath: string, newParentPath: ParentPath): Promise<FacetNotebook> {
        const notebookName = getNameFromPath(notebookPath);
        const newPath = newParentPath ? joinRelativePath(newParentPath, notebookName) : notebookName;

        if (await pathExists(this.getAbsolutePath(newPath))) {
            throw new Error(`A notebook named "${notebookName}" already exists here`);
        }

        await rename(this.getAbsolutePath(notebookPath), this.getAbsolutePath(newPath));

        const movedNotebook = { name: notebookName, parentPath: newParentPath, path: newPath };

        this.facetService.removeNotebook(notebookPath);
        this.updateChildren(notebookPath, newPath);
        this.facetService.addNotebook(movedNotebook);

        return movedNotebook;
    }

    async deleteNotebook(notebookPath: string): Promise<void> {
        const children = this.getChildrenOfNotebook(notebookPath);
        await rm(this.getAbsolutePath(notebookPath), { recursive: true });

        this.facetService.removeNotebook(notebookPath);

        children.notebooks.forEach((notebook) => {
            this.facetService.removeNotebook(notebook.path);
        });

        children.notes.forEach((note) => {
            this.facetService.removeNote(note.id);
        });
    }

    getChildrenOfNotebook(notebookPath: string): { notes: FacetNote[], notebooks: FacetNotebook[]; } {
        const noteChildren: FacetNote[] = [];
        const notebookChildren: FacetNotebook[] = [];

        for (const note of this.facetService.getNotes().values()) {
            if (note.path.startsWith(notebookPath + "/")) {
                noteChildren.push(note);
            }
        }

        for (const notebook of this.facetService.getNotebooks().values()) {
            if (notebook.path.startsWith(notebookPath + "/")) {
                notebookChildren.push(notebook);
            }
        }


        return { notes: noteChildren, notebooks: notebookChildren };
    }

    private getAbsolutePath(path: string): string {
        return toAbsoluteFacetPath(this.facetPath, path);
    }

    private updateChildren(oldPath: string, newPath: string) {
        const children = this.getChildrenOfNotebook(oldPath);

        children.notebooks.forEach((notebook) => {
            this.facetService.removeNotebook(notebook.path);
            this.facetService.addNotebook({
                ...notebook,
                path: replacePrefix(notebook.path, oldPath, newPath),
                parentPath: notebook.parentPath ? replacePrefix(notebook.parentPath, oldPath, newPath) : null
            });
        });

        children.notes.forEach((note) => {
            this.facetService.removeNote(note.id);
            this.facetService.addNote({
                ...note,
                path: replacePrefix(note.path, oldPath, newPath),
                parentPath: note.parentPath
                    ? replacePrefix(note.parentPath, oldPath, newPath)
                    : null
            });
        });
    }
}