// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { existsSync, mkdirSync, readdirSync, renameSync, rmdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

import { MetadataConfig, NotebookMetadata } from '../../shared/types/config.type.js';
import {
    getParentRelativePath,
    joinRelativePath,
    replacePrefix,
    toAbsoluteSafePath,
} from '../utils/path.utils.js';
import { MetadataService } from './metadata.service.js';
import { WorkspaceService } from './workspace.service.js';

export class NotebookService {
    constructor(
        private safePath: string,
        private metadataService: MetadataService,
        private workspaceService: WorkspaceService,
    ) {}

    private abs(path: string): string {
        return toAbsoluteSafePath(this.safePath, path);
    }

    createNotebook(parentPath: string | null, name: string): NotebookMetadata {
        const path = parentPath ? joinRelativePath(parentPath, name) : name;

        if (existsSync(this.abs(path))) {
            throw new Error('Notebook already exists');
        }

        const notebookMetadata: NotebookMetadata = {
            id: randomUUID(),
            path,
            createdAt: new Date().toISOString(),
            updatedAt: null,
        };

        try {
            mkdirSync(this.abs(path), { recursive: false });
            this.metadataService.addNotebook(notebookMetadata);
            return notebookMetadata;
        } catch (error) {
            if (existsSync(this.abs(path))) {
                rmdirSync(this.abs(path));
            }
            throw error;
        }
    }

    renameNotebook(notebookId: string, newName: string): NotebookMetadata {
        const metadata = this.metadataService.getMetadata();
        const { notebook, index } = this.metadataService.requireNotebook(metadata, notebookId);

        const oldPath = notebook.path;
        const parentPath = getParentRelativePath(oldPath);
        const newPath = parentPath ? joinRelativePath(parentPath, newName) : newName;

        if (existsSync(this.abs(newPath))) {
            throw new Error('Notebook already exists');
        }

        renameSync(this.abs(oldPath), this.abs(newPath));

        try {
            this.mutateDescendantPaths(metadata, oldPath, newPath);

            const updatedNotebook: NotebookMetadata = {
                ...metadata.notebooks[index],
                path: newPath,
                updatedAt: new Date().toISOString(),
            };

            metadata.notebooks[index] = updatedNotebook;

            this.metadataService.saveMetadata(metadata);
            this.workspaceService.replaceExpandedNotebookAndSubNotebooks(oldPath, newPath);

            return updatedNotebook;
        } catch (error) {
            renameSync(this.abs(newPath), this.abs(oldPath));
            throw error;
        }
    }

    deleteNotebook(notebookId: string): void {
        if (!this.isNotebookEmpty(notebookId)) {
            throw new Error('This notebook is not empty');
        }

        const metadata = this.metadataService.getMetadata();
        const { notebook, index } = this.metadataService.requireNotebook(metadata, notebookId);

        rmdirSync(this.abs(notebook.path));

        metadata.notebooks.splice(index, 1);
        this.metadataService.saveMetadata(metadata);
        this.workspaceService.removeExpandedNotebookAndSubNotebooks(notebook.path);
    }

    isNotebookEmpty(notebookId: string): boolean {
        const metadata = this.metadataService.getMetadata();
        const { notebook } = this.metadataService.requireNotebook(metadata, notebookId);

        return readdirSync(this.abs(notebook.path)).length === 0;
    }

    private mutateDescendantPaths(
        metadata: MetadataConfig,
        oldPath: string,
        newPath: string,
    ): void {
        metadata.notebooks = metadata.notebooks.map((notebook) => {
            if (notebook.path === oldPath || notebook.path.startsWith(oldPath + '/')) {
                return {
                    ...notebook,
                    path: replacePrefix(notebook.path, oldPath, newPath),
                };
            }
            return notebook;
        });

        metadata.notes = metadata.notes.map((note) => {
            if (note.path === oldPath || note.path.startsWith(oldPath + '/')) {
                return {
                    ...note,
                    path: replacePrefix(note.path, oldPath, newPath),
                };
            }
            return note;
        });
    }
}
