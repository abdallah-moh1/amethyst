// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Settings } from '../shared/types/settings.type.js';
import { BuiltInThemes } from '../shared/types/themes.type.js';

contextBridge.exposeInMainWorld('amethyst', {
    settings: {
        get: (key: keyof Settings) => ipcRenderer.invoke('get:setting', key),
        set: <K extends keyof Settings>(key: K, value: Settings[K]) =>
            ipcRenderer.invoke('set:setting', key, value),
        reset: () => ipcRenderer.invoke('reset:settings'),
        getAll: () => ipcRenderer.invoke('get-all:settings'),
    },

    themes: {
        get: (key: BuiltInThemes) => ipcRenderer.invoke('get:theme', key),
        list: () => ipcRenderer.invoke('list:themes'),
    },

    workspace: {
        loadSnapshot: () => ipcRenderer.invoke('workspace:load-snapshot'),
        get: () => ipcRenderer.invoke('workspace:get'),
        setLastOpenedNote: (noteId: string | null) =>
            ipcRenderer.invoke('workspace:set-last-opened-note', noteId),
        setExpandedNotebooks: (paths: string[]) =>
            ipcRenderer.invoke('workspace:set-expanded-notebooks', paths),
        addExpandedNotebook: (path: string) =>
            ipcRenderer.invoke('workspace:add-expanded-notebook', path),
        removeExpandedNotebook: (path: string) =>
            ipcRenderer.invoke('workspace:remove-expanded-notebook', path),
    },

    notes: {
        create: (parentPath: string | null, title: string) =>
            ipcRenderer.invoke('note:create', parentPath, title),
        open: (noteId: string) => ipcRenderer.invoke('note:open', noteId),
        save: (noteId: string, content: string) => ipcRenderer.invoke('note:save', noteId, content),
        rename: (noteId: string, newTitle: string) =>
            ipcRenderer.invoke('note:rename', noteId, newTitle),
        delete: (noteId: string) => ipcRenderer.invoke('note:delete', noteId),
    },

    notebooks: {
        create: (parentPath: string | null, name: string) =>
            ipcRenderer.invoke('notebook:create', parentPath, name),
        rename: (notebookId: string, newName: string) =>
            ipcRenderer.invoke('notebook:rename', notebookId, newName),
        delete: (notebookId: string) => ipcRenderer.invoke('notebook:delete', notebookId),
        isEmpty: (notebookId: string) => ipcRenderer.invoke('notebook:is-empty', notebookId),
    },
    watcher: {
        // FILE EVENTS
        onFileCreated: (cb: (path: string) => void) => {
            const handler = (_event: IpcRendererEvent, path: string) => cb(path);
            ipcRenderer.on("fs:file-created", handler);

            return () => {
                ipcRenderer.removeListener("fs:file-created", handler);
            };
        },

        onFileChanged: (cb: (path: string) => void) => {
            const handler = (_event: IpcRendererEvent, path: string) => cb(path);
            ipcRenderer.on("fs:file-changed", handler);

            return () => {
                ipcRenderer.removeListener("fs:file-changed", handler);
            };
        },

        onFileDeleted: (cb: (path: string) => void) => {
            const handler = (_event: IpcRendererEvent, path: string) => cb(path);
            ipcRenderer.on("fs:file-deleted", handler);

            return () => {
                ipcRenderer.removeListener("fs:file-deleted", handler);
            };
        },

        // FOLDER EVENTS
        onFolderCreated: (cb: (path: string) => void) => {
            const handler = (_event: IpcRendererEvent, path: string) => cb(path);
            ipcRenderer.on("fs:folder-created", handler);

            return () => {
                ipcRenderer.removeListener("fs:folder-created", handler);
            };
        },

        onFolderDeleted: (cb: (path: string) => void) => {
            const handler = (_event: IpcRendererEvent, path: string) => cb(path);
            ipcRenderer.on("fs:folder-deleted", handler);

            return () => {
                ipcRenderer.removeListener("fs:folder-deleted", handler);
            };
        },

        // LIFECYCLE
        onWatcherReady: (cb: () => void) => {
            const handler = () => cb();
            ipcRenderer.on("fs:watcher-ready", handler);

            return () => {
                ipcRenderer.removeListener("fs:watcher-ready", handler);
            };
        },

        // CLEANUP (global fallback only)
        removeAll: () => {
            ipcRenderer.removeAllListeners("fs:file-created");
            ipcRenderer.removeAllListeners("fs:file-changed");
            ipcRenderer.removeAllListeners("fs:file-deleted");
            ipcRenderer.removeAllListeners("fs:folder-created");
            ipcRenderer.removeAllListeners("fs:folder-deleted");
            ipcRenderer.removeAllListeners("fs:watcher-ready");
        },
    }
});
