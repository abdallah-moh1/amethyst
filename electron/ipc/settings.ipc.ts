// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import {
    getAllSettings,
    getSetting,
    resetSettings,
    setSetting,
} from '../services/settings.service.js';

export function registerSettingsIpc() {
    ipcMain.handle('get:setting', (_event, key) => {
        return getSetting(key);
    });

    ipcMain.handle('set:setting', (_event, key, value) => {
        setSetting(key, value);
    });

    ipcMain.handle('reset:settings', () => {
        resetSettings();
    });

    ipcMain.handle('get-all:settings', () => {
        return getAllSettings();
    });
}
