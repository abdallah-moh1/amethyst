// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import { ParentPath } from '../../../shared/types/facet.type.js';
import { NotebookService } from './notebook.service.js';

export function registerNotebookIpc(notebookService: NotebookService) {
    ipcMain.handle('notebook:create', async (_, parentPath: ParentPath, name: string) => {
        try {
            return await notebookService.createNotebook(parentPath, name);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('notebook:rename', async (_, path: string, newName: string) => {
        try {
            return await notebookService.renameNotebook(path, newName);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('notebook:move', async (_, path: string, newParentPath: ParentPath) => {
        try {
            return await notebookService.moveNotebook(path, newParentPath);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('notebook:delete', async (_, path: string) => {
        try {
            return await notebookService.deleteNotebook(path);
        } catch (error) {
            return { error };
        }
    });
}
