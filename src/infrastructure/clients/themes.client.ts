// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BuiltInThemes, Theme } from '@shared/types/themes.type';

export class ThemesClient {
    static get(key: BuiltInThemes): Promise<Theme> {
        return window.amethyst.themes.get(key);
    }

    static list(): Promise<BuiltInThemes[]> {
        return window.amethyst.themes.list();
    }
}
