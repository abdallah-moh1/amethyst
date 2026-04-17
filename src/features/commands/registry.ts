// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Command, CommandId } from '@/types/command.type';

class CommandRegistry {
    private static instance: CommandRegistry;
    private commands = new Map<CommandId, Command>();

    private constructor() {}

    public static getInstance(): CommandRegistry {
        if (!CommandRegistry.instance) {
            CommandRegistry.instance = new CommandRegistry();
        }
        return CommandRegistry.instance;
    }

    // Allows any module to "plug in" a command at runtime
    register(command: Command): void {
        const cmd = this.commands.get(command.id);

        if (cmd) {
            if (cmd.canBeOverwritten)
                console.warn(`[CommandRegistry] Overwriting command: ${command.id}`);
            else {
                console.warn(`[CommandRegistry] Command: ${command.id}, can't be overwritten`);
                return;
            }
        }

        this.commands.set(command.id, command);
    }

    canExecute(id: CommandId): boolean {
        const cmd = this.commands.get(id);
        if (!cmd) return false;

        // If no check is provided, it's always enabled
        return cmd.isEnabled ? cmd.isEnabled() : true;
    }

    execute(id: CommandId, ...args: unknown[]): void {
        const cmd = this.commands.get(id);
        if (cmd && this.canExecute(id)) {
            cmd.execute(...args);
        } else if (cmd) {
            console.warn(`[CommandRegistry] Command ${id} is blocked by isEnabled logic.`);
        }
    }

    // Critical for Command Palette: Returns all registered commands
    getAllCommands(): Command[] {
        return Array.from(this.commands.values());
    }
}

export const commands = CommandRegistry.getInstance();
