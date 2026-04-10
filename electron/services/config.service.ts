// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { MetadataConfig, WorkspaceConfig } from '../../shared/types/config.type.js';
import { existsSync, mkdirSync } from 'node:fs';

export class ConfigService {
    safePath: string;
    configPath: string;

    constructor(safePath: string) {
        this.safePath = safePath;
        this.configPath = join(safePath, '.config');

        mkdirSync(this.configPath, { recursive: true });

        const workspaceFile = this.getWorkspaceFilePath();
        const metadataFile = this.getMetadataFilePath();

        if (!existsSync(workspaceFile)) {
            this.createWorkspaceConfigFile();
        }
        if (!existsSync(metadataFile)) {
            this.createMetadataConfigFile();
        }
    }

    private createWorkspaceConfigFile(): void {
        this.writeWorkspaceFile({
            version: 1,
            lastOpenedNoteId: null,
            expandedNotebookPaths: [],
        });
    }

    private createMetadataConfigFile(): void {
        this.writeMetadataFile({
            version: 1,
            notes: [],
            notebooks: [],
        });
    }

    getWorkspaceFilePath(): string {
        return join(this.configPath, 'workspace.json');
    }

    getMetadataFilePath(): string {
        return join(this.configPath, 'metadata.json');
    }

    async readMetadataFile(): Promise<MetadataConfig> {
        return JSON.parse(await readFile(this.getMetadataFilePath(), 'utf-8')) as MetadataConfig;
    }

    async readWorkspaceFile(): Promise<WorkspaceConfig> {
        return JSON.parse(await readFile(this.getWorkspaceFilePath(), 'utf-8')) as WorkspaceConfig;
    }

    async writeMetadataFile(data: MetadataConfig): Promise<void> {
        await writeFile(this.getMetadataFilePath(), JSON.stringify(data, null, 2), 'utf-8');
    }

    async writeWorkspaceFile(data: WorkspaceConfig): Promise<void> {
        await writeFile(this.getWorkspaceFilePath(), JSON.stringify(data, null, 2), 'utf-8');
    }
}
