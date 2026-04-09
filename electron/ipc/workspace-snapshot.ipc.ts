// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import { WorkspaceSnapshotService } from '../services/workspace-snapshot.service.js';

export function registerWorkspaceSnapshotIpc(workspaceSnapshotService: WorkspaceSnapshotService) {
    ipcMain.handle('workspace:load-snapshot', () => {
        return workspaceSnapshotService.loadSnapshot();
    });
}
