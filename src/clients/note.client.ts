export async function createNote(parentPath: string | null, title: string) {
    return await window.amethyst.notes.create(parentPath, title);
}

export async function openNote(noteId: string) {
    return await window.amethyst.notes.open(noteId);
}

export async function saveNote(noteId: string, content: string) {
    return await window.amethyst.notes.save(noteId, content);
}

export async function renameNote(noteId: string, newTitle: string) {
    return await window.amethyst.notes.rename(noteId, newTitle);
}

export async function deleteNote(noteId: string) {
    return await window.amethyst.notes.delete(noteId);
}
