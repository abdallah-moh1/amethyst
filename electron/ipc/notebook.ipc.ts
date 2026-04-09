import { ipcMain } from "electron";
import { NotebookService } from "../services/notebook.service.js";

export function registerNotebookIpc(notebookService: NotebookService) {
    ipcMain.handle("notebook:create", (_event, parentPath: string | null, name: string) => {
        return notebookService.createNotebook(parentPath, name);
    });

    ipcMain.handle("notebook:rename", (_event, notebookId: string, newName: string) => {
        return notebookService.renameNotebook(notebookId, newName);
    });

    ipcMain.handle("notebook:delete", (_event, notebookId: string) => {
        notebookService.deleteNotebook(notebookId);
    });

    ipcMain.handle("notebook:is-empty", (_event, notebookId: string) => {
        return notebookService.isNotebookEmpty(notebookId);
    });
}