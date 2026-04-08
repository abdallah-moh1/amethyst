// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { WorkspaceStore } from '@/types/stores.type';
import { create } from 'zustand';

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    viewMode: 'editor',
    noteContent: '',
    syncedScroll: {
        source: null,
        percentage: 0,
    },
    setViewMode: (mode) => {
        set({ viewMode: mode });
    },
    setNoteContent: (content) => {
        set({ noteContent: content });
    },
    setSyncedScroll: (syncedScroll) => {
        set({ syncedScroll });
    },
}));
