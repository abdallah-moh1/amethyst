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
} from '../commands/wrappers';
import { CommandExecutionResult } from '@/shared/types/command.type';

export function useNoteActions() {
    const toast = useInteractionStore.getState().addToast;

    const handle = async <T extends unknown[]>(
        fn: (...args: T) => Promise<CommandExecutionResult>,
        args: T,
    ) => {
        const result = await fn(...args);

        if (!result.success) {
            toast({
                id: crypto.randomUUID(),
                message: result.message,
                type: 'error',
                duration: 4000,
            });
        }

        return result;
    };

    return {
        create: (...args: Parameters<typeof createNote>) =>
            handle(createNote, args),

        open: (...args: Parameters<typeof openNote>) =>
            handle(openNote, args),

        save: (...args: Parameters<typeof saveNote>) =>
            handle(saveNote, args),

        rename: (...args: Parameters<typeof renameNote>) =>
            handle(renameNote, args),

        move: (...args: Parameters<typeof moveNote>) =>
            handle(moveNote, args),

        remove: (...args: Parameters<typeof deleteNote>) =>
            handle(deleteNote, args),
    };
}