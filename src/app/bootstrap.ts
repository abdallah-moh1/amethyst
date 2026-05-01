// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BuiltInThemes } from '@shared/types/themes.type';
import { Settings } from '@shared/types/settings.type';
import { applyTheme } from '@/features/theme/theme.runtime';
import { SettingsClient, ThemesClient } from '@/infrastructure/clients';
import { initFacet } from './initFacet';
import { registerNotebookCommands } from '@/features/notebooks';
import { registerNoteCommands } from '@/features/notes';
import { registerDefaultKeybindings } from '@/core/keybindings';

export async function bootstrapApp() {
    // 1. Register commands first — bindKey warns if command doesn't exist yet
    registerNoteCommands();
    registerNotebookCommands();

    // 2. Bind keys — all shortcuts in one place
    registerDefaultKeybindings();

    // 3. Apply theme and open facet
    const themeSetting = (await SettingsClient.get('theme')) as Settings['theme'];
    applyTheme(await ThemesClient.get(themeSetting.id as BuiltInThemes));

    await initFacet();
}
