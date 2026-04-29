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
    commands.register({
        id: NotebookCommands.CREATE_NOTEBOOK,
        label: 'Create notebook',
        canBeOverwritten: false,
        shortcut: {
            ctrlKey: true,
            shiftKey: true,
            key: 'N',
        },
        execute: createNotebookCommandExec,
    });

    commands.register({
        id: NotebookCommands.DELETE_NOTEBOOK,
        label: 'Delete notebook',
        canBeOverwritten: false,
        shortcut: {
            key: 'Delete',
        },
        isApplicable() {
            return useInteractionStore.getState().selectedItem?.type === 'notebook';
        },
        execute: deleteNotebookCommandExec,
    });

    commands.register({
        id: NotebookCommands.MOVE_NOTEBOOK,
        label: 'Move notebook',
        canBeOverwritten: false,
        execute: moveNotebookCommandExec,
    });

    commands.register({
        id: NotebookCommands.RENAME_NOTEBOOK,
        label: 'Rename notebook',
        canBeOverwritten: false,
        shortcut: {
            key: 'F2',
        },
        isApplicable() {
            return useInteractionStore.getState().selectedItem?.type === 'notebook';
        },
        execute: renameNotebookCommandExec,
    });
};
