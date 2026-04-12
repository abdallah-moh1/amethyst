// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BuiltInThemes } from '@shared/types/themes.type';
import { Settings } from '@shared/types/settings.type';
import { applyTheme } from '@/features/theme/theme.runtime';
import { getSetting } from '@/services/settings.client';
import { getTheme } from '@/services/themes.client';

export async function bootstrapApp() {
    const themeSetting = (await getSetting('theme')) as Settings['theme'];
    await window.amethyst.facet.open();


    applyTheme(await getTheme(themeSetting.id as BuiltInThemes));
}
