import { ipcMain } from "electron";
import { WorkspaceService } from "../services/workspace.service.js";

export function registerWorkspaceIpc(workspaceService: WorkspaceService) {
    ipcMain.handle("workspace:get", () => {
        return workspaceService.getWorkspace();
    });

    ipcMain.handle("workspace:set-last-opened-note", (_event, noteId: string | null) => {
        workspaceService.setLastOpenedNoteId(noteId);
    });

    ipcMain.handle("workspace:set-expanded-notebooks", (_event, paths: string[]) => {
        workspaceService.setExpandedNotebookPaths(paths);
    });

    ipcMain.handle("workspace:add-expanded-notebook", (_event, path: string) => {
        workspaceService.addExpandedNotebookPath(path);
    });

    ipcMain.handle("workspace:remove-expanded-notebook", (_event, path: string) => {
        workspaceService.removeExpandedNotebookPath(path);
    });
}