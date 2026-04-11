export function onFileCreated(cb: (path: string) => void) {
    return window.amethyst.watcher.onFileCreated(cb);
}

export function onFileChanged(cb: (path: string) => void) {
    return window.amethyst.watcher.onFileChanged(cb);
}

export function onFileDeleted(cb: (path: string) => void) {
    return window.amethyst.watcher.onFileDeleted(cb);
}

export function onFolderCreated(cb: (path: string) => void) {
    return window.amethyst.watcher.onFileDeleted(cb);
}

export function onFolderDeleted(cb: (path: string) => void) {
    return window.amethyst.watcher.onFolderDeleted(cb);
}

export function onReady(cb: () => void) {
    return window.amethyst.watcher.onWatcherReady(cb);
}

export function cleanup() {
    return window.amethyst.watcher.removeAll();
}
