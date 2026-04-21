// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BuiltInThemes } from '@shared/types/themes.type';
import { Settings } from '@shared/types/settings.type';
import { applyTheme } from '@/features/theme/theme.runtime';
import { getSetting } from '@/clients/settings.client';
import { getTheme } from '@/clients/themes.client';
import { initFacet } from './initFacet';
import { registerFacetCommands } from '@/features/commands';

export async function bootstrapApp() {
    registerFacetCommands();
    const themeSetting = (await getSetting('theme')) as Settings['theme'];

    applyTheme(await getTheme(themeSetting.id as BuiltInThemes));
    await initFacet();
}
