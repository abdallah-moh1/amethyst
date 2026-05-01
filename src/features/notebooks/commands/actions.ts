// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands } from '@/core/commands';
import { NotebookCommands } from './commands';

import {
    CreateNotebookArgs,
    DeleteNotebookArgs,
    MoveNotebookArgs,
    RenameNotebookArgs,
} from '@/shared/types/command.type';

const run = (id: string, args: unknown[]) => {
    return commands.execute(id, ...args);
};

export const createNotebook = (args: CreateNotebookArgs) =>
    run(NotebookCommands.CREATE_NOTEBOOK, [args.parentPath, args.name]);

export const deleteNotebook = (args: DeleteNotebookArgs) =>
    run(NotebookCommands.DELETE_NOTEBOOK, [args.path]);

export const moveNotebook = (args: MoveNotebookArgs) =>
    run(NotebookCommands.MOVE_NOTEBOOK, [args.oldPath, args.newParentPath]);

export const renameNotebook = (args: RenameNotebookArgs) =>
    run(NotebookCommands.RENAME_NOTEBOOK, [args.path, args.newName]);
