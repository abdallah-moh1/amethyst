import { ViewingMode } from '@/types/workspace.type';

export type WorkspaceStore = {
    viewMode: ViewingMode;
    noteContent: string;
    setViewMode: (mode: ViewingMode) => void;
    setNoteContent: (content: string) => void;
};
