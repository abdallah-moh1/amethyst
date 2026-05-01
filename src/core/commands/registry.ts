// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Command, CommandExecutionResult, CommandId, Shortcut } from '@/shared/types/command.type';
import { getDisplayableShortcut, normalizeShortcut } from '@/shared/utils/shortcut';

type BindingEntry = {
    commandId: string;
    shortcut: Shortcut;
};

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

    // normalized key (e.g. "ctrl+n") → binding entries
    // kept separate from commands so keys can be rebound without touching command definitions
    private bindings = new Map<string, BindingEntry[]>();

    // ─── Command Registration ────────────────────────────────────────────────

    registerCommand(command: Command): void {
        if (this.commands.has(command.id)) {
            console.warn(`[CommandRegistry] Duplicate command ignored: ${command.id}`);
            return;
        }
        this.commands.set(command.id, command);
    }

    // ─── Key Binding ─────────────────────────────────────────────────────────

    bindKey(shortcut: Shortcut, commandId: string): void {
        if (!this.commands.has(commandId)) {
            console.warn(`[CommandRegistry] bindKey: command "${commandId}" is not registered`);
        }
        const key = normalizeShortcut(shortcut);
        const existing = this.bindings.get(key) ?? [];
        this.bindings.set(key, [...existing, { commandId, shortcut }]);
    }

    unbindKey(shortcut: Shortcut, commandId: string): void {
        const key = normalizeShortcut(shortcut);
        const existing = this.bindings.get(key) ?? [];
        this.bindings.set(
            key,
            existing.filter((e) => e.commandId !== commandId),
        );
    }

    rebindKey(commandId: string, oldShortcut: Shortcut, newShortcut: Shortcut): void {
        this.unbindKey(oldShortcut, commandId);
        this.bindKey(newShortcut, commandId);
    }

    // ─── Execution ───────────────────────────────────────────────────────────

    async executeShortcut(normalizedKey: string): Promise<CommandExecutionResult> {
        const entries = this.bindings.get(normalizedKey) ?? [];

        const applicable = entries
            .map((e) => this.commands.get(e.commandId))
            .filter((cmd): cmd is Command => {
                if (!cmd) return false;
                if (cmd.isEnabled && !cmd.isEnabled()) return false;
                if (cmd.isApplicable && !cmd.isApplicable()) return false;
                return true;
            });

        if (applicable.length === 0) return { success: true };

        const results = await Promise.all(applicable.map((cmd) => cmd.execute()));
        return results.find((r) => !r.success) ?? { success: true };
    }

    async execute(id: CommandId, ...args: unknown[]): Promise<CommandExecutionResult> {
        const cmd = this.commands.get(id);

        if (!cmd) {
            return { success: false, message: `Command "${id}" not found` };
        }

        if (cmd.isEnabled && !cmd.isEnabled()) {
            return { success: false, message: `Command "${id}" is currently disabled` };
        }

        return cmd.execute(...args);
    }

    // ─── Queries ─────────────────────────────────────────────────────────────

    /** Returns the displayable shortcut string for the first binding of a command */
    getCommandShortcut(commandId: string): string | undefined {
        for (const entries of this.bindings.values()) {
            const entry = entries.find((e) => e.commandId === commandId);
            if (entry) return getDisplayableShortcut(entry.shortcut);
        }
    }

    getCommand(id: string): Command | undefined {
        return this.commands.get(id);
    }

    getAllCommands(): Command[] {
        return Array.from(this.commands.values());
    }
}

export const commands = CommandRegistry.getInstance();
