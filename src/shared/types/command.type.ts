// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath } from "@shared/types/facet.type";

export type CommandId = string;

export type Command = {
    id: CommandId;
    label: string;
    canBeOverwritten: boolean;
    execute: (...args: unknown[]) => Promise<CommandExecutionResult>;
    isEnabled?: () => boolean;
};

export type CommandExecutionResult =
    | {
        success: true;
    }
    | {
        success: false;
        message: string;
    };

export type CreateNoteArgs = [ParentPath?, string?];
export type OpenNoteArgs = [string];
export type SaveNoteArgs = [string?, string?];
export type RenameNoteArgs = [string?, string?];
export type MoveNoteArgs = [string, ParentPath];
export type DeleteNoteArgs = [string?];

export type CreateNotebookArgs = [ParentPath?, string?];
export type DeleteNotebookArgs = [string];
export type MoveNotebookArgs = [string, ParentPath];
export type RenameNotebookArgs = [string, string?];