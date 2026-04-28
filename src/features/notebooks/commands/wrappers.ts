// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands } from '@/core/commands';
import { NotebookCommands } from './register';

import {
    CreateNotebookArgs,
    DeleteNotebookArgs,
    MoveNotebookArgs,
    RenameNotebookArgs,
} from '@/shared/types/command.type';

const run = <TArgs extends unknown[]>(
    id: string,
    ...args: TArgs
) => {
    return commands.execute(id, ...args);
};

export const createNotebook = (...args: CreateNotebookArgs) =>
    run(NotebookCommands.CREATE_NOTEBOOK, ...args);

export const deleteNotebook = (...args: DeleteNotebookArgs) =>
    run(NotebookCommands.DELETE_NOTEBOOK, ...args);

export const moveNotebook = (...args: MoveNotebookArgs) =>
    run(NotebookCommands.MOVE_NOTEBOOK, ...args);

export const renameNotebook = (...args: RenameNotebookArgs) =>
    run(NotebookCommands.RENAME_NOTEBOOK, ...args);