
export function createNotebook(parentPath: string | null, name: string) {
    window.amethyst.notebooks.create(parentPath, name);
}

export async function renameNotebook(notebookId: string, newName: string) {
    window.amethyst.notebooks.rename(notebookId, newName);
}

export async function deleteNotebook(notebookId: string) {
    return await window.amethyst.notebooks.delete(notebookId);
}

export async function isNotebookEmpty(notebookId: string) {
    return await window.amethyst.notebooks.isEmpty(notebookId);
}
