// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { WorkspaceConfig } from '../../shared/types/config.type.js';
import { replacePrefix } from '../utils/path.utils.js';
import { ConfigService } from './config.service.js';

export class WorkspaceService {
    constructor(private configService: ConfigService) { }

    async getWorkspace(): Promise<WorkspaceConfig> {
        return await this.configService.readWorkspaceFile();
    }

    async setLastOpenedNoteId(noteId: string | null): Promise<void> {
        const workspace = await this.getWorkspace();

        await this.configService.writeWorkspaceFile({ ...workspace, lastOpenedNoteId: noteId });
    }

    async setExpandedNotebookPaths(paths: string[]): Promise<void> {
        const workspace = await this.getWorkspace();

        this.configService.writeWorkspaceFile({ ...workspace, expandedNotebookPaths: paths });
    }

    async addExpandedNotebookPath(path: string): Promise<void> {
        const workspace = await this.getWorkspace();
        if (workspace.expandedNotebookPaths.find((value) => value === path)) return;

        this.setExpandedNotebookPaths([...workspace.expandedNotebookPaths, path]);
    }

    async removeExpandedNotebookPath(path: string): Promise<void> {
        const workspace = await this.getWorkspace();

        this.setExpandedNotebookPaths(
            workspace.expandedNotebookPaths.filter((value) => value !== path),
        );
    }

    async removeExpandedNotebookAndSubNotebooks(path: string): Promise<void> {
        const updatedList = (await this.getWorkspace()).expandedNotebookPaths.filter((value) => {
            if (value === path || value.startsWith(path + '/')) {
                return false;
            }
            return true;
        });

        this.setExpandedNotebookPaths(updatedList);
    }

    async replaceExpandedNotebookAndSubNotebooks(oldPath: string, newPath: string): Promise<void> {
        const updatedList = (await this.getWorkspace()).expandedNotebookPaths.map((value) => {
            if (value === oldPath || value.startsWith(oldPath + '/')) {
                return replacePrefix(value, oldPath, newPath);
            }
            return value;
        });

        this.setExpandedNotebookPaths(updatedList);
    }
}
