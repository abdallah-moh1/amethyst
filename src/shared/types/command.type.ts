// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath } from '@shared/types/facet.type';

export type CommandId = string;

export type Shortcut = {
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    key: string;
};

export type Command = {
    id: CommandId;
    label: string;
    shortcut?: Shortcut;
    canBeOverwritten: boolean;
    execute: (...args: unknown[]) => Promise<CommandExecutionResult>;
    isEnabled?: () => boolean;
    isApplicable?: () => boolean;
};

export type CommandExecutionResult =
    | {
          success: true;
      }
    | {
          success: false;
          message: string;
      };

export type CreateNoteArgs = {
    parentPath?: ParentPath;
    name?: string;
};

export type OpenNoteArgs = {
    id: string;
};

export type SaveNoteArgs = {
    id?: string;
    content?: string;
};

export type RenameNoteArgs = {
    id?: string | null;
    newName?: string;
};

export type MoveNoteArgs = {
    id: string;
    newParentPath: ParentPath;
};

export type DeleteNoteArgs = {
    id?: string;
};

export type CreateNotebookArgs = {
    parentPath?: ParentPath;
    name?: string;
};

export type DeleteNotebookArgs = {
    path: string;
};

export type MoveNotebookArgs = {
    oldPath: string;
    newParentPath: ParentPath;
};

export type RenameNotebookArgs = {
    path: string;
    newName?: string;
};
