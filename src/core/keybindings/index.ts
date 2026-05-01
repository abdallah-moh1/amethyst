// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands } from '@/core/commands';
import { NoteCommands } from '@/features/notes';
import { NotebookCommands } from '@/features/notebooks';

/**
 * All default key bindings in one place.
 *
 * Call this after registerNoteCommands() and registerNotebookCommands()
 * so all command IDs are already registered before binding.
 *
 * To support user-customizable shortcuts, load overrides from settings
 * after this and call commands.rebindKey() for each override.
 */
export const registerDefaultKeybindings = () => {
    // ── Notes ────────────────────────────────────────────────────────────────
    commands.bindKey({ ctrlKey: true, key: 'N' }, NoteCommands.CREATE_NOTE);
    commands.bindKey({ ctrlKey: true, key: 'S' }, NoteCommands.SAVE_NOTE);
    commands.bindKey({ key: 'F2' }, NoteCommands.RENAME_NOTE);
    commands.bindKey({ key: 'Delete' }, NoteCommands.DELETE_NOTE);

    // ── Notebooks ────────────────────────────────────────────────────────────
    commands.bindKey({ ctrlKey: true, shiftKey: true, key: 'N' }, NotebookCommands.CREATE_NOTEBOOK);
    commands.bindKey({ key: 'F2' }, NotebookCommands.RENAME_NOTEBOOK);
    commands.bindKey({ key: 'Delete' }, NotebookCommands.DELETE_NOTEBOOK);

    // F2 and Delete each have two bindings — isApplicable() on each command
    // determines which one fires based on what's currently selected.
};
