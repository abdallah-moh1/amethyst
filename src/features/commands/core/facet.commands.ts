// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { registerNoteCommands } from './note.commands';
import { registerNotebookCommands } from './notebook.commands';

/**
 * The "Note Facet" - Registers all commands related to 
 * notes and notebook management.
 */
export const FacetCommands = {
    // NOTE COMMANDS
    CREATE_NOTE: 'note:create',
    OPEN_NOTE: 'note:open',
    RENAME_NOTE: 'note:rename',
    MOVE_NOTE: 'note:move',
    SAVE_NOTE: 'note:save',
    DELETE_NOTE: 'note:delete',
    // NOTEBOOK COMMANDS
    CREATE_NOTEBOOK: 'notebook:create',
    MOVE_NOTEBOOK: 'notebook:move',
    RENAME_NOTEBOOK: 'notebook:rename',
    DELETE_NOTEBOOK: 'notebook:delete',
} as const;

export const registerFacetCommands = () => {
    registerNoteCommands();
    registerNotebookCommands();
};