// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { contextBridge, ipcRenderer, Settings } from 'electron';
import { ParentPath } from '../shared/types/facet.type.js';

contextBridge.exposeInMainWorld('amethyst', {
    settings: {
        get: (key: keyof Settings) => ipcRenderer.invoke('get:setting', key),
        set: <K extends keyof Settings>(key: K, value: Settings[K]) =>
            ipcRenderer.invoke('set:setting', key, value),
        reset: () => ipcRenderer.invoke('reset:settings'),
        getAll: () => ipcRenderer.invoke('get-all:settings'),
    },
    themes: {
        get: (key: string) => ipcRenderer.invoke('get:theme', key),
        list: () => ipcRenderer.invoke('list:themes'),
    },
    facet: {
        open: () => ipcRenderer.invoke('facet:open'),
        // Still to do when adding dir watcher
        // on: {
        //     noteAdded: (cb: (note: FacetNote) => void) =>
        //         ipcRenderer.on('facet:note-added', (_, note) => cb(note)),
        //     noteChanged: (cb: (note: FacetNote) => void) =>
        //         ipcRenderer.on('facet:note-changed', (_, note) => cb(note)),
        //     noteRemoved: (cb: (id: string) => void) =>
        //         ipcRenderer.on('facet:note-removed', (_, id) => cb(id)),
        //     notebookAdded: (cb: (notebook: FacetNotebook) => void) =>
        //         ipcRenderer.on('facet:notebook-added', (_, notebook) => cb(notebook)),
        //     notebookChanged: (cb: (payload: { oldPath: string, notebook: FacetNotebook; }) => void) =>
        //         ipcRenderer.on('facet:notebook-changed', (_, payload) => cb(payload)),
        //     notebookRemoved: (cb: (path: string) => void) =>
        //         ipcRenderer.on('facet:notebook-removed', (_, path) => cb(path)),
        // }
    },
    notes: {
        create: (name: string, parentPath: ParentPath) =>
            ipcRenderer.invoke('note:create', name, parentPath),
        open: (id: string) => ipcRenderer.invoke('note:open', id),
        save: (id: string, content: string) => ipcRenderer.invoke('note:save', id, content),
        rename: (id: string, newName: string) => ipcRenderer.invoke('note:rename', id, newName),
        move: (id: string, newParentPath: ParentPath) =>
            ipcRenderer.invoke('note:move', id, newParentPath),
        delete: (id: string) => ipcRenderer.invoke('note:delete', id),
    },
    notebooks: {
        create: (parentPath: ParentPath, name: string) =>
            ipcRenderer.invoke('notebook:create', parentPath, name),
        rename: (path: string, newName: string) =>
            ipcRenderer.invoke('notebook:rename', path, newName),
        move: (path: string, newParentPath: ParentPath) =>
            ipcRenderer.invoke('notebook:move', path, newParentPath),
        delete: (path: string) => ipcRenderer.invoke('notebook:delete', path),
    },
});
