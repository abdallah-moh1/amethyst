// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands } from '@/core/commands';
import {
    createNoteCommandExec,
    deleteNoteCommandExec,
    moveNoteCommandExec,
    openNoteCommandExec,
    renameNoteCommandExec,
    saveNoteCommandExec,
} from './exec';

export const NoteCommands = {
    CREATE_NOTE: 'note:create',
    OPEN_NOTE: 'note:open',
    RENAME_NOTE: 'note:rename',
    MOVE_NOTE: 'note:move',
    SAVE_NOTE: 'note:save',
    DELETE_NOTE: 'note:delete',
} as const;

export const registerNoteCommands = () => {
    commands.register({
        id: NoteCommands.CREATE_NOTE,
        label: 'Create note',
        canBeOverwritten: false,
        execute: createNoteCommandExec,
    });

    commands.register({
        id: NoteCommands.OPEN_NOTE,
        label: 'Open note',
        canBeOverwritten: false,
        execute: openNoteCommandExec,
    });

    commands.register({
        id: NoteCommands.SAVE_NOTE,
        label: 'Save note',
        canBeOverwritten: false,
        execute: saveNoteCommandExec,
    });

    commands.register({
        id: NoteCommands.RENAME_NOTE,
        label: 'Rename note',
        canBeOverwritten: false,
        execute: renameNoteCommandExec,
    });

    commands.register({
        id: NoteCommands.MOVE_NOTE,
        label: 'Move note',
        canBeOverwritten: false,
        execute: moveNoteCommandExec,
    });

    commands.register({
        id: NoteCommands.DELETE_NOTE,
        label: 'Delete note',
        canBeOverwritten: false,
        execute: deleteNoteCommandExec,
    });
};
