// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import { SettingsService } from '../services/settings.service.js';

export function registerSettingsIpc(settingsService: SettingsService) {
    ipcMain.handle('get:setting', (_event, key) => {
        return settingsService.getSetting(key);
    });

    ipcMain.handle('set:setting', (_event, key, value) => {
        settingsService.setSetting(key, value);
    });

    ipcMain.handle('reset:settings', () => {
        settingsService.resetSettings();
    });

    ipcMain.handle('get-all:settings', () => {
        return settingsService.getAllSettings();
    });
}
