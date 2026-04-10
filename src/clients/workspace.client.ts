export async function loadConfigSnapshot() {
    return window.amethyst.workspace.loadSnapshot();
}

export async function getWorkspaceConfig() {
    return window.amethyst.workspace.get();
}

export async function setLastOpenedNote(noteId: string | null) {
    return window.amethyst.workspace.setLastOpenedNote(noteId);
}

export async function setExpandedNotebooks(paths: string[]) {
    return window.amethyst.workspace.setExpandedNotebooks(paths);
}

export async function addExpandedNotebook(path: string) {
    return window.amethyst.workspace.addExpandedNotebook(path);
}

export async function removeExpandedNotebook(path: string) {
    return window.amethyst.workspace.removeExpandedNotebook(path);
}
