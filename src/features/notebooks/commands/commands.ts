// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands } from '@/core/commands';
import {
    createNotebookCommandExec,
    deleteNotebookCommandExec,
    moveNotebookCommandExec,
    renameNotebookCommandExec,
} from './handlers';
import { useInteractionStore } from '@/store';

export const NotebookCommands = {
    CREATE_NOTEBOOK: 'notebook:create',
    MOVE_NOTEBOOK: 'notebook:move',
    RENAME_NOTEBOOK: 'notebook:rename',
    DELETE_NOTEBOOK: 'notebook:delete',
} as const;

export const registerNotebookCommands = () => {
    commands.registerCommand({
        id: NotebookCommands.CREATE_NOTEBOOK,
        label: 'Create notebook',
        execute: createNotebookCommandExec,
    });

    commands.registerCommand({
        id: NotebookCommands.DELETE_NOTEBOOK,
        label: 'Delete notebook',
        isApplicable: () => useInteractionStore.getState().selectedItem?.type === 'notebook',
        execute: deleteNotebookCommandExec,
    });

    commands.registerCommand({
        id: NotebookCommands.MOVE_NOTEBOOK,
        label: 'Move notebook',
        execute: moveNotebookCommandExec,
    });

    commands.registerCommand({
        id: NotebookCommands.RENAME_NOTEBOOK,
        label: 'Rename notebook',
        isApplicable: () => useInteractionStore.getState().selectedItem?.type === 'notebook',
        execute: renameNotebookCommandExec,
    });
};
