// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BrowserWindow } from "electron";
import { SafeWatcherService } from "../services/safe-watcher.service.js";

export function registerWatcherIpc(
    watcher: SafeWatcherService,
    window: BrowserWindow
) {
    // FILE CREATED
    watcher.onFileCreated((path) => {
        window.webContents.send("fs:file-created", path);
    });

    // FILE CHANGED
    watcher.onFileChanged((path) => {
        window.webContents.send("fs:file-changed", path);
    });

    // FILE DELETED
    watcher.onFileDeleted((path) => {
        window.webContents.send("fs:file-deleted", path);
    });

    // FOLDER CREATED
    watcher.onFolderCreated((path) => {
        window.webContents.send("fs:folder-created", path);
    });

    // FOLDER DELETED
    watcher.onFolderDeleted((path) => {
        window.webContents.send("fs:folder-deleted", path);
    });

    // READY STATE
    watcher.onReady(() => {
        window.webContents.send("fs:watcher-ready");
    });
}