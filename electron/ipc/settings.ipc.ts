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
    ipcMain.handle('get:setting', async (_event, key) => {
        try {
            return await getSetting(key);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('set:setting', async (_event, key, value) => {
        try {
            return await setSetting(key, value);
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('reset:settings', async () => {
        try {
            return await resetSettings();
        } catch (error) {
            return { error };
        }
    });

    ipcMain.handle('get-all:settings', async () => {
        try {
            return await getAllSettings();
        } catch (error) {
            return { error };
        }
    });
}
