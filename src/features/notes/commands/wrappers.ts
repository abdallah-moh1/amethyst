// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands } from '@/core/commands';
import { NoteCommands } from './register';

import {
    CreateNoteArgs,
    OpenNoteArgs,
    SaveNoteArgs,
    RenameNoteArgs,
    MoveNoteArgs,
    DeleteNoteArgs,
} from '@/shared/types/command.type';

const run = <TArgs extends unknown[]>(
    id: string,
    ...args: TArgs
) => {
    return commands.execute(id, ...args);
};

export const createNote = (...args: CreateNoteArgs) =>
    run(NoteCommands.CREATE_NOTE, ...args);

export const openNote = (...args: OpenNoteArgs) =>
    run(NoteCommands.OPEN_NOTE, ...args);

export const saveNote = (...args: SaveNoteArgs) =>
    run(NoteCommands.SAVE_NOTE, ...args);

export const renameNote = (...args: RenameNoteArgs) =>
    run(NoteCommands.RENAME_NOTE, ...args);

export const moveNote = (...args: MoveNoteArgs) =>
    run(NoteCommands.MOVE_NOTE, ...args);

export const deleteNote = (...args: DeleteNoteArgs) =>
    run(NoteCommands.DELETE_NOTE, ...args);