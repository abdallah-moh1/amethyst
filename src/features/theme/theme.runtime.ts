// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import type { Theme } from "@shared/types/themes.type.ts";

export function applyTheme(theme: Theme) {
    const root = document.documentElement;

    for (const [key, value] of Object.entries(theme.app)) {
        root.style.setProperty(`--app-color-${key}`, value);
    }

}