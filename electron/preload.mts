// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { contextBridge, ipcRenderer } from 'electron';
import { Settings } from '../shared/types/settings.type.js';
import { FacetNote, FacetNotebook, ParentPath } from '../shared/types/facet.type.js';

/**
 * Type-safe invoke helper.
 * Uses unknown[] for rest arguments to satisfy TS without using 'any'.
 */
async function invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
    const result = await ipcRenderer.invoke(channel, ...args);

    // Check if the result is our standardized error object from Main
    if (result && typeof result === 'object' && 'error' in result) {
        // Throw the raw error (usually a string or error object)
        // so the Renderer catch block receives it cleanly.
        throw result.error;
    }

    return result as T;
}

contextBridge.exposeInMainWorld('amethyst', {
    settings: {
        get: (key: keyof Settings) => invoke<Settings[keyof Settings]>('get:setting', key),
        set: <K extends keyof Settings>(key: K, value: Settings[K]) =>
            invoke<void>('set:setting', key, value),
        reset: () => invoke<void>('reset:settings'),
        getAll: () => invoke<Settings>('get-all:settings'),
    },
    themes: {
        get: (key: string) => invoke<unknown>('get:theme', key),
        list: () => invoke<string[]>('list:themes'),
    },
    facet: {
        open: () => invoke<void>('facet:open'),
        close: () => invoke<void>('facet:close'),
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
        },
    },
    notes: {
        create: (name: string, parentPath: ParentPath) =>
            invoke<FacetNote>('note:create', name, parentPath),
        open: (id: string) => invoke<string>('note:open', id),
        save: (id: string, content: string) => invoke<void>('note:save', id, content),
        rename: (id: string, newName: string) => invoke<void>('note:rename', id, newName),
        move: (id: string, newParentPath: ParentPath) =>
            invoke<void>('note:move', id, newParentPath),
        delete: (id: string) => invoke<void>('note:delete', id),
    },
    notebooks: {
        create: (parentPath: ParentPath, name: string) =>
            invoke<FacetNotebook>('notebook:create', parentPath, name),
        rename: (path: string, newName: string) => invoke<void>('notebook:rename', path, newName),
        move: (path: string, newParentPath: ParentPath) =>
            invoke<void>('notebook:move', path, newParentPath),
        delete: (path: string) => invoke<void>('notebook:delete', path),
    },
});
