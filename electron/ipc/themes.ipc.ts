// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import { getTheme, listThemes } from '../services/themes.service.js';

export function registerThemesIpc() {
    ipcMain.handle('get:theme', (_event, key) => {
        return getTheme(key);
    });
    ipcMain.handle('list:themes', () => {
        return listThemes();
    });
}
