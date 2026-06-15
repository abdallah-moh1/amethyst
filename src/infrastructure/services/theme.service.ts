// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import type { Theme } from '@shared/types/themes.type.ts';

export function applyTheme(theme: Theme) {
    const root = document.documentElement;

    // Use Record<string, unknown> instead of any for strict type compliance
    function parseThemeNode(node: Record<string, unknown>, prefix: string) {
        for (const [key, value] of Object.entries(node)) {
            const currentKey = `${prefix}-${key}`;

            if (value && typeof value === 'object' && !Array.isArray(value)) {
                // Safely cast to Record<string, unknown> to step into the next layer
                parseThemeNode(value as Record<string, unknown>, currentKey);
            } else if (value !== null && value !== undefined) {
                root.style.setProperty(currentKey, String(value));
            }
        }
    }

    // Loop through top-level categories (app, editor, scrollbar)
    for (const [topLevelKey, topLevelValue] of Object.entries(theme)) {
        if (topLevelValue && typeof topLevelValue === 'object') {
            parseThemeNode(topLevelValue as Record<string, unknown>, `--${topLevelKey}`);
        }
    }
}
