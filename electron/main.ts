// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { app, BrowserWindow } from 'electron';
import path from 'node:path';

import { loadSettings } from './services/settings.service.js';
import { createWindow } from './window/createWindow.js';
import { registerSettingsIpc } from './ipc/settings.ipc.js';
import { registerThemesIpc } from './features/themes/themes.ipc.js';
import { FacetService } from './features/facet/facet.service.js';
import { registerFacetIpc } from './features/facet/facet.ipc.js';
import { NoteService } from './features/notes/note.service.js';
import { NotebookService } from './features/notebooks/notebook.service.js';
import { registerNoteIpc } from './features/notes/note.ipc.js';
import { registerNotebookIpc } from './features/notebooks/notebook.ipc.js';

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
// Todo: allow picking facet and support multiple facets
const facetPath = path.join(app.getPath('home'), '.amethyst');


app.whenReady().then(() => {
    loadSettings();
    createWindow();
    const facetService = new FacetService(facetPath);
    const noteService = new NoteService(facetPath, facetService);
    const notebookService = new NotebookService(facetPath, facetService);



    // Load IPC handlers

    // Settings and themes
    registerSettingsIpc();
    registerThemesIpc();

    // Notes and Notebooks
    registerFacetIpc(facetService);
    registerNoteIpc(noteService);
    registerNotebookIpc(notebookService);


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
