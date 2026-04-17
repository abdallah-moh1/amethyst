// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

export type CommandId = string;

export type Command = {
    id: CommandId;
    label: string;
    canBeOverwritten: boolean;
    execute: (...args: unknown[]) => void | Promise<void>;
    isEnabled?: () => boolean;
};
