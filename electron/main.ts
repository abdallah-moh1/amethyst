// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { app, BrowserWindow } from 'electron';
import path from 'node:path';

import { loadSettings } from './services/settings.service.js';
import { createWindow } from './window/createWindow.js';
import { registerSettingsIpc } from './ipc/settings.ipc.js';
import { registerThemesIpc } from './ipc/themes.ipc.js';

app.setName('Amethyst');
if (process.platform === 'win32') {
    app.setAppUserModelId('com.amethyst.app');
}

if (!app.isPackaged) {
    const devUserData = path.join(app.getPath('appData'), 'Amethyst (Development)');
    const devSessionData = path.join(devUserData, 'session');

    app.setPath('userData', devUserData);
    app.setPath('sessionData', devSessionData);
}

app.whenReady().then(() => {
    loadSettings();
    createWindow();

    // Load IPC handlers
    registerSettingsIpc();
    registerThemesIpc();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
