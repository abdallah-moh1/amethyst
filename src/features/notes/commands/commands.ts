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
} from './handlers';
import { useInteractionStore } from '@/store';

export const NoteCommands = {
    CREATE_NOTE: 'note:create',
    OPEN_NOTE: 'note:open',
    RENAME_NOTE: 'note:rename',
    MOVE_NOTE: 'note:move',
    SAVE_NOTE: 'note:save',
    DELETE_NOTE: 'note:delete',
} as const;

export const registerNoteCommands = () => {
    commands.registerCommand({
        id: NoteCommands.CREATE_NOTE,
        label: 'Create note',
        execute: createNoteCommandExec,
    });

    commands.registerCommand({
        id: NoteCommands.OPEN_NOTE,
        label: 'Open note',
        execute: openNoteCommandExec,
    });

    commands.registerCommand({
        id: NoteCommands.SAVE_NOTE,
        label: 'Save note',
        execute: saveNoteCommandExec,
    });

    commands.registerCommand({
        id: NoteCommands.RENAME_NOTE,
        label: 'Rename note',
        isApplicable: () => useInteractionStore.getState().selectedItem?.type === 'note',
        execute: renameNoteCommandExec,
    });

    commands.registerCommand({
        id: NoteCommands.MOVE_NOTE,
        label: 'Move note',
        execute: moveNoteCommandExec,
    });

    commands.registerCommand({
        id: NoteCommands.DELETE_NOTE,
        label: 'Delete note',
        isApplicable: () => useInteractionStore.getState().selectedItem?.type === 'note',
        execute: deleteNoteCommandExec,
    });
};