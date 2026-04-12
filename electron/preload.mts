// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { contextBridge, ipcRenderer, Settings } from 'electron';
import { FacetNote, FacetNotebook, ParentPath } from '../shared/types/facet.type.js';

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
        close: () => ipcRenderer.invoke('facet:close'),
        on: {
            noteAdded: (cb: (note: FacetNote) => void) => {
                const listener = (_: unknown, note: FacetNote) => cb(note);
                ipcRenderer.on('facet:note-added', listener);
                return () => ipcRenderer.off('facet:note-added', listener);
            },
            noteChanged: (cb: (note: FacetNote) => void) => {
                const listener = (_: unknown, note: FacetNote) => cb(note);
                ipcRenderer.on('facet:note-changed', listener);
                return () => ipcRenderer.off('facet:note-changed', listener);
            },
            noteRemoved: (cb: (id: string) => void) => {
                const listener = (_: unknown, id: string) => cb(id);
                ipcRenderer.on('facet:note-removed', listener);
                return () => ipcRenderer.off('facet:note-removed', listener);
            },
            notebookAdded: (cb: (notebook: FacetNotebook) => void) => {
                const listener = (_: unknown, notebook: FacetNotebook) => cb(notebook);
                ipcRenderer.on('facet:notebook-added', listener);
                return () => ipcRenderer.off('facet:notebook-added', listener);
            },
            notebookRemoved: (cb: (path: string) => void) => {
                const listener = (_: unknown, path: string) => cb(path);
                ipcRenderer.on('facet:notebook-removed', listener);
                return () => ipcRenderer.off('facet:notebook-removed', listener);
            },
        }
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
