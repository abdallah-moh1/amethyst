// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import type { Theme } from '@shared/types/themes.type.ts';

export function applyTheme(theme: Theme) {
    const root = document.documentElement;

    for (const [key, value] of Object.entries(theme.app)) {
        root.style.setProperty(`--app-${key}`, value);
    }

    for (const [sectionKey, sectionValues] of Object.entries(theme.editor)) {
        for (const [key, value] of Object.entries(sectionValues)) {
            root.style.setProperty(`--editor-${sectionKey}-${key}`, value);
        }
    }

    for (const [key, value] of Object.entries(theme.scrollbar)) {
        root.style.setProperty(`--scrollbar-${key}`, value);
    }
}
