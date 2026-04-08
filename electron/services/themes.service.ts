// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BUILTIN_THEMES, BuiltInThemes } from '../../shared/types/themes.type.js';

export async function getTheme(themeId: BuiltInThemes) {
    const theme = await import(`../themes/${themeId}.json`, { with: { type: 'json' } });
    return { ...theme.default };
}

export function listThemes() {
    return Object.values(BUILTIN_THEMES);
}
