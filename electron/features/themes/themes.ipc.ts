// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import { ThemesService } from './themes.service.js';

export function registerThemesIpc() {
    ipcMain.handle('get:theme', async (_event, key) => {
        try {
            return await ThemesService.getTheme(key);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('list:themes', async () => {
        try {
            return ThemesService.listThemes();
        } catch (error) {
            return { error };
        }
    });
}
