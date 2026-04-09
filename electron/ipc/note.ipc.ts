import { ipcMain } from "electron";
import { NoteService } from "../services/note.service.js";

export function registerNoteIpc(noteService: NoteService) {
    ipcMain.handle("note:create", (_event, parentPath: string | null, title: string) => {
        return noteService.createNote(parentPath, title);
    });

    ipcMain.handle("note:open", (_event, noteId: string) => {
        return noteService.openNote(noteId);
    });

    ipcMain.handle("note:save", (_event, noteId: string, content: string) => {
        return noteService.saveNote(noteId, content);
    });

    ipcMain.handle("note:rename", (_event, noteId: string, newTitle: string) => {
        return noteService.renameNote(noteId, newTitle);
    });

    ipcMain.handle("note:delete", (_event, noteId: string) => {
        noteService.deleteNote(noteId);
    });
}