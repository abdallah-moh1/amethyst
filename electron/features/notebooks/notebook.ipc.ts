import { ipcMain } from "electron";
import { ParentPath } from "../../../shared/types/facet.type.js";
import { NotebookService } from "./notebook.service.js";

export function registerNotebookIpc(notebookService: NotebookService) {
    ipcMain.handle('notebook:create', (_, parentPath: ParentPath, name: string) => notebookService.createNotebook(parentPath, name));
    ipcMain.handle('notebook:rename', (_, path: string, newName: string) => notebookService.renameNotebook(path, newName));
    ipcMain.handle('notebook:move', (_, path: string, newParentPath: ParentPath) => notebookService.moveNotebook(path, newParentPath));
    ipcMain.handle('notebook:delete', (_, path: string) => notebookService.deleteNotebook(path));
}