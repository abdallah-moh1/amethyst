// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { MetadataConfig, NotebookMetadata, NoteMetadata } from '../../shared/types/config.type.js';
import { randomUUID } from 'node:crypto';
import { ConfigService } from './config.service.js';
import { SafeScannerService } from './safe-scanner.service.js';

export class MetadataSyncService {
    constructor(
        private configService: ConfigService,
        private safeScannerService: SafeScannerService,
    ) { }

    syncWithDisk(): MetadataConfig {
        const scanned = this.safeScannerService.scan();
        const metadata = this.configService.readMetadataFile();

        const nextNotes = this.syncNotes(scanned.notes, metadata.notes);
        const nextNotebooks = this.syncNotebooks(scanned.notebooks, metadata.notebooks);

        const nextMetadata: MetadataConfig = {
            ...metadata,
            notes: nextNotes,
            notebooks: nextNotebooks,
        };

        this.configService.writeMetadataFile(nextMetadata);
        return nextMetadata;
    }

    private syncNotes(scannedPaths: string[], existing: NoteMetadata[]): NoteMetadata[] {
        const existingMap = new Map(existing.map((item) => [item.path, item]));

        return scannedPaths.map((path) => {
            const found = existingMap.get(path);
            if (found) return found;

            const now = new Date().toISOString();
            return {
                id: randomUUID(),
                path,
                createdAt: now,
                updatedAt: null,
            };
        });
    }

    private syncNotebooks(
        scannedPaths: string[],
        existing: NotebookMetadata[],
    ): NotebookMetadata[] {
        const existingMap = new Map(existing.map((item) => [item.path, item]));

        return scannedPaths.map((path) => {
            const found = existingMap.get(path);
            if (found) return found;

            const now = new Date().toISOString();
            return {
                id: randomUUID(),
                path,
                createdAt: now,
                updatedAt: null,
            };
        });
    }
}
