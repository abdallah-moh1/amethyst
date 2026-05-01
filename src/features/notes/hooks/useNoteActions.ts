// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useInteractionStore } from '@/store';

import {
    createNote,
    openNote,
    saveNote,
    renameNote,
    moveNote,
    deleteNote,
} from '../commands/actions';
import {
    CommandExecutionResult,
    CreateNoteArgs,
    DeleteNoteArgs,
    MoveNoteArgs,
    OpenNoteArgs,
    RenameNoteArgs,
    SaveNoteArgs,
} from '@/shared/types/command.type';

export function useNoteActions() {
    const handle = async <T>(fn: (args: T) => Promise<CommandExecutionResult>, args: T) => {
        const result = await fn(args);

        if (!result.success) {
            useInteractionStore.getState().addToast({
                id: crypto.randomUUID(),
                message: result.message,
                type: 'error',
                duration: 4000,
            });
        }

        return result;
    };

    return {
        create: (args: CreateNoteArgs) => handle(createNote, args),
        open: (args: OpenNoteArgs) => handle(openNote, args),
        save: (args: SaveNoteArgs) => handle(saveNote, args),
        rename: (args: RenameNoteArgs) => handle(renameNote, args),
        move: (args: MoveNoteArgs) => handle(moveNote, args),
        remove: (args: DeleteNoteArgs) => handle(deleteNote, args),
    };
}
