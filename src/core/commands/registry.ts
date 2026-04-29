// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Command, CommandExecutionResult, CommandId } from '@/shared/types/command.type';
import { shortcuts } from '../shortcuts-manager/registry';
import { getDisplayableShortcut } from '@/shared/utils/shortcut';

class CommandRegistry {
    private static instance: CommandRegistry;
    private commands = new Map<CommandId, Command>();

    private constructor() { }

    public static getInstance(): CommandRegistry {
        if (!CommandRegistry.instance) {
            CommandRegistry.instance = new CommandRegistry();
        }
        return CommandRegistry.instance;
    }

    // Allows any module to "plug in" a command at runtime
    register(command: Command): void {
        const cmd = this.commands.get(command.id);

        if (cmd && cmd.canBeOverwritten) {
            console.warn(`[CommandRegistry] Overwriting command: ${command.id}`);
        } else if (cmd) {
            console.warn(`[CommandRegistry] Command: ${command.id}, can't be overwritten`);
            return;
        }

        shortcuts.register(command);
        this.commands.set(command.id, command);
    }

    canExecute(id: CommandId): boolean {
        const cmd = this.commands.get(id);
        if (!cmd) return false;

        // If no check is provided, it's always enabled
        return cmd.isEnabled ? cmd.isEnabled() : true;
    }

    async execute(id: CommandId, ...args: unknown[]): Promise<CommandExecutionResult> {
        const cmd = this.getCommand(id);

        if (cmd && this.canExecute(id)) {
            return await cmd.execute(...args);
        } else if (cmd) {
            console.warn(`[CommandRegistry] Command ${id} is blocked by isEnabled logic.`);
            return {
                success: false,
                message: `Command ${id} is blocked by isEnabled logic.`,
            };
        }

        return {
            success: false,
            message: `Command ${id} doesn't exist`,
        };
    }

    getCommandShortcut(id: string) {
        const cmd = this.getCommand(id);
        return cmd?.shortcut
            ? getDisplayableShortcut(cmd.shortcut)
            : undefined;
    }

    getCommand(id: string): Command | undefined {
        return this.commands.get(id);
    }

    // Critical for Command Palette: Returns all registered commands
    getAllCommands(): Command[] {
        return Array.from(this.commands.values());
    }
}

export const commands = CommandRegistry.getInstance();
