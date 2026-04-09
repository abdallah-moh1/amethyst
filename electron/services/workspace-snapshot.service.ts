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
    ) {}

    loadSnapshot(): WorkspaceSnapshot {
        const metadata = this.metadataSyncService.syncWithDisk();
        const workspace = this.workspaceService.getWorkspace();

        const tree = SafeTreeService.sortTree(
            SafeTreeService.buildTree(metadata.notebooks, metadata.notes),
        );

        const activeNote = this.resolveActiveNote(metadata, workspace);

        return {
            metadata,
            workspace,
            tree,
            activeNote,
        };
    }

    private resolveActiveNote(
        metadata: MetadataConfig,
        workspace: WorkspaceConfig,
    ): { metadata: NoteMetadata; content: string } | null {
        const lastOpenedNoteId = workspace.lastOpenedNoteId;
        if (!lastOpenedNoteId) return null;

        const noteMetadata = metadata.notes.find((note) => note.id === lastOpenedNoteId);
        if (!noteMetadata) {
            this.workspaceService.setLastOpenedNoteId(null);
            return null;
        }

        return this.noteService.openNote(noteMetadata.id);
    }
}
