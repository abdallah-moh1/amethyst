import { WorkspaceConfig } from "../../shared/types/config.type.js";
import { ConfigService } from "./config.service.js";

export class WorkspaceService {
    constructor(private configService: ConfigService) { }

    getWorkspace(): WorkspaceConfig {
        return this.configService.readWorkspaceFile();
    }

    setLastOpenedNoteId(noteId: string | null): void {
        const workspace = this.getWorkspace();

        this.configService.writeWorkspaceFile({ ...workspace, lastOpenedNoteId: noteId });
    }

    setExpandedNotebookPaths(paths: string[]): void {
        const workspace = this.getWorkspace();

        this.configService.writeWorkspaceFile({ ...workspace, expandedNotebookPaths: paths });
    }

    addExpandedNotebookPath(path: string): void {
        const workspace = this.getWorkspace();
        if (workspace.expandedNotebookPaths.find((value) => value === path)) return;
        this.configService.writeWorkspaceFile({ ...workspace, expandedNotebookPaths: [...workspace.expandedNotebookPaths, path] });
    }

    removeExpandedNotebookPath(path: string): void {
        const workspace = this.getWorkspace();

        this.configService.writeWorkspaceFile({ ...workspace, expandedNotebookPaths: workspace.expandedNotebookPaths.filter((value) => value !== path) });
    }
}