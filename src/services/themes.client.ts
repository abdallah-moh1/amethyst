// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BuiltInThemes } from "@shared/types/themes.type";

export async function getTheme(key: BuiltInThemes) {
    return await window.amethyst.themes.get(key);
}

export async function listThemes() {
    return await window.amethyst.themes.list();
}
