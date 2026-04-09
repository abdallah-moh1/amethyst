// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { app, BrowserWindow } from 'electron';
import path from 'node:path';

import { SettingsService } from './services/settings.service.js';
import { createWindow } from './window/createWindow.js';
import { registerSettingsIpc } from './ipc/settings.ipc.js';
import { registerThemesIpc } from './ipc/themes.ipc.js';
import { registerWorkspaceIpc } from './ipc/workspace.ipc.js';
import { registerNoteIpc } from './ipc/note.ipc.js';
import { registerNotebookIpc } from './ipc/notebook.ipc.js';
import { ConfigService } from './services/config.service.js';
import { mkdirSync } from 'node:fs';
import { MetadataService } from './services/metadata.service.js';
import { WorkspaceService } from './services/workspace.service.js';
import { NoteService } from './services/note.service.js';
import { NotebookService } from './services/notebook.service.js';
import { SafeScannerService } from './services/safe-scanner.service.js';
import { MetadataSyncService } from './services/metadata-sync.service.js';
import { WorkspaceSnapshotService } from './services/workspace-snapshot.service.js';
import { registerWorkspaceSnapshotIpc } from './ipc/workspace-snapshot.ipc.js';

const safePath = path.join(app.getPath('home'), '.amethyst');

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
    mkdirSync(safePath, { recursive: true });

    const configService = new ConfigService(safePath);
    const metadataService = new MetadataService(configService);
    const workspaceService = new WorkspaceService(configService);
    const safeScannerService = new SafeScannerService(safePath);
    const metadataSyncService = new MetadataSyncService(configService, safeScannerService);
    const noteService = new NoteService(safePath, metadataService);
    const notebookService = new NotebookService(safePath, metadataService, workspaceService);

    const workspaceSnapshotService = new WorkspaceSnapshotService(
        metadataSyncService,
        workspaceService,
        noteService,
    );

    const settingsService = new SettingsService(path.join(app.getPath('appData'), 'settings.json'));

    createWindow();

    registerSettingsIpc(settingsService);
    registerThemesIpc();
    registerWorkspaceIpc(workspaceService);
    registerNoteIpc(noteService);
    registerNotebookIpc(notebookService);
    registerWorkspaceSnapshotIpc(workspaceSnapshotService);

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
