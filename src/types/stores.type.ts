import { SyncedScroll, ViewingMode } from '@/types/workspace.type';

export type WorkspaceStore = {
    viewMode: ViewingMode;
    noteContent: string;
    syncedScroll: SyncedScroll,
    setViewMode: (mode: ViewingMode) => void;
    setNoteContent: (content: string) => void;
    setSyncedScroll: (syncedScroll: SyncedScroll) => void;
};
