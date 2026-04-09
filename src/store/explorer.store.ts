// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ExplorerStore } from '@/types/explorer.type';
import { create } from 'zustand';

export const useExplorerStore = create<ExplorerStore>((set) => ({
    tree: [],
    expandedNotebooks: [],
    selectedPath: null,
    isLoading: false,
    error: null,

    setTree: (tree) => set({ tree }),
    setExpandedNotebooks(notebooks: string[]) {
        set({ expandedNotebooks: notebooks });
    },
    setSelectedPath: (path) => set({ selectedPath: path }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () =>
        set({
            tree: [],
            expandedNotebooks: [],
            selectedPath: null,
            isLoading: false,
            error: null,
        }),
}));
