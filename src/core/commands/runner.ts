// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands } from './registry';
import { useInteractionStore } from '@/store';

export const CommandRunner = {
    async execute(id: string, ...args: unknown[]) {
        const result = await commands.execute(id, ...args);

        if (!result.success) {
            // Centralized error handling
            useInteractionStore.getState().addToast({
                id: crypto.randomUUID(),
                message: result.message,
                type: 'error',
                duration: 4000,
            });
        }

        return result;
    },
};
