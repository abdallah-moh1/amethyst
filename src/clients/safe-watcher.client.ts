import { ipcRenderer } from 'electron';

export function onFileCreated(cb: (path: string) => void) {
    ipcRenderer.on('fs:file-created', (_e, path) => cb(path));
}

export function onFileChanged(cb: (path: string) => void) {
    ipcRenderer.on('fs:file-changed', (_e, path) => cb(path));
}

export function onFileDeleted(cb: (path: string) => void) {
    ipcRenderer.on('fs:file-deleted', (_e, path) => cb(path));
}

export function onFolderCreated(cb: (path: string) => void) {
    ipcRenderer.on('fs:folder-created', (_e, path) => cb(path));
}

export function onFolderDeleted(cb: (path: string) => void) {
    ipcRenderer.on('fs:folder-deleted', (_e, path) => cb(path));
}

export function onReady(cb: () => void) {
    ipcRenderer.on('fs:watcher-ready', () => cb());
}

export function cleanup() {
    ipcRenderer.removeAllListeners('fs:file-created');
    ipcRenderer.removeAllListeners('fs:file-changed');
    ipcRenderer.removeAllListeners('fs:file-deleted');
    ipcRenderer.removeAllListeners('fs:folder-created');
    ipcRenderer.removeAllListeners('fs:folder-deleted');
    ipcRenderer.removeAllListeners('fs:watcher-ready');
}
