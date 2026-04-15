// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { create } from 'zustand';

type SelectedItem =
    | { type: 'note'; id: string; path: string }
    | { type: 'notebook'; path: string }
    | null;

type InteractionState = {
    selectedItem: SelectedItem;
    expandedItems: string[];

    mode: 'idle' | 'creating' | 'renaming';

    setSelectedItem: (item: SelectedItem) => void;
    setExpandedItems: (items: string[]) => void;

    reset: () => void;
};

export const useInteractionStore = create<InteractionState>((set) => ({
    selectedItem: null,
    expandedItems: [],
    mode: 'idle',

    setSelectedItem: (item) => set({ selectedItem: item }),
    setExpandedItems: (items) => set({ expandedItems: items }),

    reset: () =>
        set({
            selectedItem: null,
            expandedItems: [],
            mode: 'idle',
        }),
}));
