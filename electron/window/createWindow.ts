// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah
import { app, BrowserWindow, Menu, shell } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, 'icons', 'icon.png')
    : path.join(process.cwd(), 'assets', 'icons', 'icon.png');

export function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        title: 'Amethyst',
        icon: iconPath,
        webPreferences: {
            preload: path.join(__dirname, '..', 'preload.mjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
    });

    if (app.isPackaged) {
        Menu.setApplicationMenu(null);
    }

    // Prevent opening external links inside the Electron app
    win.webContents.setWindowOpenHandler(({ url }) => {
        // Open the URL in the system's default browser
        shell.openExternal(url);
        // Deny the request to open it inside the Electron app
        return { action: 'deny' };
    });

    win.webContents.on('will-navigate', (event, url) => {
        // Optional: only redirect if the URL is external (starts with http/https)
        if (url.startsWith('http')) {
            event.preventDefault(); // Stop Electron from loading the page
            shell.openExternal(url); // Open in external browser
        }
    });

    const devServerUrl = process.env.ELECTRON_START_URL;

    if (devServerUrl) {
        win.loadURL(devServerUrl);
    } else {
        const appPath = app.isPackaged ? app.getAppPath() : process.cwd();
        win.loadFile(path.join(appPath, 'dist', 'index.html'));
    }
}
