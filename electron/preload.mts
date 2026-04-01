// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { contextBridge, ipcRenderer, Settings } from 'electron';

contextBridge.exposeInMainWorld('amethyst', {
    settings: {
        get: (key: keyof Settings) => ipcRenderer.invoke('get:setting', key),
        set: <K extends keyof Settings>(key: K, value: Settings[K]) => ipcRenderer.invoke('set:setting', key, value),
        reset: () => ipcRenderer.invoke('reset:settings'),
        getAll: () => ipcRenderer.invoke('get-all:settings'),
    },
    themes: {
        get: (key: string) => ipcRenderer.invoke('get:theme', key),
        list: () => ipcRenderer.invoke('list:themes'),
    }
});