// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import { NoteService } from './note.service.js';
import { ParentPath } from '../../../shared/types/facet.type.js';

export function registerNoteIpc(noteService: NoteService) {
    ipcMain.handle('note:create', (_, name: string, parentPath: ParentPath) =>
        noteService.createNote(name, parentPath),
    );
    ipcMain.handle('note:open', (_, id: string) => noteService.openNote(id));
    ipcMain.handle('note:save', (_, id: string, content: string) =>
        noteService.saveNote(id, content),
    );
    ipcMain.handle('note:rename', (_, id: string, newName: string) =>
        noteService.renameNote(id, newName),
    );
    ipcMain.handle('note:move', (_, id: string, newParentPath: ParentPath) =>
        noteService.moveNote(id, newParentPath),
    );
    ipcMain.handle('note:delete', (_, id: string) => noteService.deleteNote(id));
}
