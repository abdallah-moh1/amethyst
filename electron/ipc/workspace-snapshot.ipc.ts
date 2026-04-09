import { ipcMain } from 'electron';
import { WorkspaceSnapshotService } from '../services/workspace-snapshot.service.js';

export function registerWorkspaceSnapshotIpc(workspaceSnapshotService: WorkspaceSnapshotService) {
    ipcMain.handle('workspace:load-snapshot', () => {
        return workspaceSnapshotService.loadSnapshot();
    });
}
