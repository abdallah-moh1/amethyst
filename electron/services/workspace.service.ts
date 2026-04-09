import { WorkspaceConfig } from "../../shared/types/config.type.js";
import { replacePrefix } from "../utils/path.utils.js";
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

        this.setExpandedNotebookPaths([...workspace.expandedNotebookPaths, path]);
    }

    removeExpandedNotebookPath(path: string): void {
        const workspace = this.getWorkspace();

        this.setExpandedNotebookPaths(workspace.expandedNotebookPaths.filter((value) => value !== path));
    }

    removeExpandedNotebookAndSubNotebooks(path: string): void {
        const updatedList = this.getWorkspace().expandedNotebookPaths.filter((value) => {
            if (value === path || value.startsWith(path + "/")) {
                return false;
            }
            return true;
        });

        this.setExpandedNotebookPaths(updatedList);
    }

    replaceExpandedNotebookAndSubNotebooks(oldPath: string, newPath: string): void {
        const updatedList = this.getWorkspace().expandedNotebookPaths.map((value) => {
            if (value === oldPath || value.startsWith(oldPath + "/")) {
                return replacePrefix(value, oldPath, newPath);
            }
            return value;
        });

        this.setExpandedNotebookPaths(updatedList);
    }
}