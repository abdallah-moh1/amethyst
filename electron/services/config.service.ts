// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MetadataConfig, WorkspaceConfig } from '../../shared/types/config.type.js';

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

    readMetadataFile(): MetadataConfig {
        return JSON.parse(readFileSync(this.getMetadataFilePath(), 'utf-8')) as MetadataConfig;
    }

    readWorkspaceFile(): WorkspaceConfig {
        return JSON.parse(readFileSync(this.getWorkspaceFilePath(), 'utf-8')) as WorkspaceConfig;
    }

    writeMetadataFile(data: MetadataConfig): void {
        writeFileSync(this.getMetadataFilePath(), JSON.stringify(data, null, 2), 'utf-8');
    }

    writeWorkspaceFile(data: WorkspaceConfig): void {
        writeFileSync(this.getWorkspaceFilePath(), JSON.stringify(data, null, 2), 'utf-8');
    }
}
