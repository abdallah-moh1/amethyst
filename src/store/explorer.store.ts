// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ExplorerStore } from '@/types/explorer.type';
import { create } from 'zustand';

export const useExplorerStore = create<ExplorerStore>((set) => ({
    tree: [],
    expandedNotebooks: new Set(),
    selectedPath: null,

    isLoading: false,
    error: null,

    setTree: (tree) => set({ tree }),

    toggleNotebook: (path) =>
        set((state) => {
            const next = new Set(state.expandedNotebooks);

            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }

            return { expandedNotebooks: next };
        }),

    expandNotebook: (path) =>
        set((state) => {
            const next = new Set(state.expandedNotebooks);
            next.add(path);
            return { expandedNotebooks: next };
        }),

    collapseNotebook: (path) =>
        set((state) => {
            const next = new Set(state.expandedNotebooks);
            next.delete(path);
            return { expandedNotebooks: next };
        }),

    collapseAll: () => set({ expandedNotebooks: new Set() }),

    setSelectedPath: (path) => set({ selectedPath: path }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),

    reset: () =>
        set({
            tree: [],
            expandedNotebooks: new Set(),
            selectedPath: null,
            isLoading: false,
            error: null,
        }),
}));
