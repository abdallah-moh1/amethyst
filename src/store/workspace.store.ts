import { WorkspaceStore } from './types/stores.type';
import { create } from 'zustand';

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    viewMode: 'editor',
    noteContent: '',
    setViewMode: (mode) => {
        set({ viewMode: mode });
    },
    setNoteContent: (content) => {
        set({ noteContent: content });
    },
}));
