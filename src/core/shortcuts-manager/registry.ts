// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Command, CommandExecutionResult } from '@/shared/types/command.type';
import { normalizeShortcut } from '@/shared/utils/shortcut';
import { commands } from '../commands';

class ShortcutRegistry {
    private static instance: ShortcutRegistry;
    private shortcuts = new Map<string, string[]>();

    private constructor() {}

    public static getInstance(): ShortcutRegistry {
        if (!ShortcutRegistry.instance) {
            ShortcutRegistry.instance = new ShortcutRegistry();
        }
        return ShortcutRegistry.instance;
    }

    register(command: Command): void {
        if (!command.shortcut) return;
        const shortcut = normalizeShortcut(command.shortcut);

        const commandIds = this.shortcuts.get(shortcut);
        if (commandIds) {
            this.shortcuts.set(shortcut, [...commandIds, command.id]);
            return;
        }

        this.shortcuts.set(shortcut, [command.id]);
    }

    async execute(shortcut: string): Promise<CommandExecutionResult> {
        const commandIds = this.shortcuts.get(shortcut);
        if (!commandIds)
            return {
                success: true,
            };

        commandIds.forEach((value) => {
            const cmd = commands.getCommand(value);

            if (cmd && (!cmd.isApplicable || (cmd.isApplicable && cmd.isApplicable()))) {
                return commands.execute(value);
            }
        });

        return { success: true };
    }
}

export const shortcuts = ShortcutRegistry.getInstance();
