// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import { NoteService } from './note.service.js';
import { ParentPath } from '../../../shared/types/facet.type.js';

export function registerNoteIpc(noteService: NoteService) {
    ipcMain.handle('note:create', async (_, name: string, parentPath: ParentPath) => {
        try {
            return await noteService.createNote(name, parentPath);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('note:open', async (_, id: string) => {
        try {
            return await noteService.openNote(id);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('note:save', async (_, id: string, content: string) => {
        try {
            return await noteService.saveNote(id, content);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('note:rename', async (_, id: string, newName: string) => {
        try {
            return await noteService.renameNote(id, newName);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('note:move', async (_, id: string, newParentPath: ParentPath) => {
        try {
            return await noteService.moveNote(id, newParentPath);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('note:delete', async (_, id: string) => {
        try {
            return await noteService.deleteNote(id);
        } catch (error) {
            return { error };
        }
    });
}
