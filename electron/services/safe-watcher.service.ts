import chokidar, { FSWatcher } from "chokidar";

export class SafeWatcherService {
    private watcher: FSWatcher;

    constructor(private safePath: string) {
        this.watcher = chokidar.watch(safePath, {
            persistent: true,
            ignored: /(^|[/\\])\.config/,
            awaitWriteFinish: true,
            ignoreInitial: true,
        });
    }

    // FILE EVENTS
    onFileCreated(callback: (path: string) => void) {
        this.watcher.on("add", callback);
    }

    onFileChanged(callback: (path: string) => void) {
        this.watcher.on("change", callback);
    }

    onFileDeleted(callback: (path: string) => void) {
        this.watcher.on("unlink", callback);
    }

    // DIRECTORY EVENTS
    onFolderCreated(callback: (path: string) => void) {
        this.watcher.on("addDir", callback);
    }

    onFolderDeleted(callback: (path: string) => void) {
        this.watcher.on("unlinkDir", callback);
    }

    // LIFECYCLE
    onReady(callback: () => void) {
        this.watcher.on("ready", callback);
    }

    onError(callback: (error: unknown) => void) {
        this.watcher.on("error", callback);
    }

    // CLEANUP
    async close() {
        await this.watcher.close();
    }
}