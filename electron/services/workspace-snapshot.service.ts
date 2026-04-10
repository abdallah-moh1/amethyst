// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { MetadataConfig, NoteMetadata, WorkspaceConfig } from '../../shared/types/config.type.js';
import { TreeNode } from '../../shared/types/tree.type.js';
import { MetadataSyncService } from './metadata-sync.service.js';
import { NoteService } from './note.service.js';
import { SafeTreeService } from './safe-tree.service.js';
import { WorkspaceService } from './workspace.service.js';

export type WorkspaceSnapshot = {
    metadata: MetadataConfig;
    workspace: WorkspaceConfig;
    tree: TreeNode[];
    activeNote: {
        metadata: NoteMetadata;
        content: string;
    } | null;
};

export class WorkspaceSnapshotService {
    constructor(
        private metadataSyncService: MetadataSyncService,
        private workspaceService: WorkspaceService,
        private noteService: NoteService,
    ) { }

    async loadSnapshot(): Promise<WorkspaceSnapshot> {
        const metadata = await this.metadataSyncService.syncWithDisk();
        const workspace = await this.workspaceService.getWorkspace();

        const tree = SafeTreeService.sortTree(
            SafeTreeService.buildTree(metadata.notebooks, metadata.notes),
        );

        const activeNote = await this.resolveActiveNote(metadata, workspace);

        return {
            metadata,
            workspace,
            tree,
            activeNote,
        };
    }

    private async resolveActiveNote(
        metadata: MetadataConfig,
        workspace: WorkspaceConfig,
    ): Promise<{ metadata: NoteMetadata; content: string; } | null> {
        const lastOpenedNoteId = workspace.lastOpenedNoteId;
        if (!lastOpenedNoteId) return null;

        const noteMetadata = metadata.notes.find((note) => note.id === lastOpenedNoteId);
        if (!noteMetadata) {
            this.workspaceService.setLastOpenedNoteId(null);
            return null;
        }

        return await this.noteService.openNote(noteMetadata.id);
    }
}
