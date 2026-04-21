// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ToastMessage } from '@/features/toast-notifications/ToastNotifications';
import { ParentPath } from '@shared/types/facet.type';
import { create } from 'zustand';

type SelectedItem =
    | { type: 'note'; id: string; path: string }
    | { type: 'notebook'; path: string }
    | null;

type InteractionState = {
    selectedItem: SelectedItem;
    expandedItems: string[];

    mode: 'idle' | 'creating' | 'renaming';

    ghost: GhostItem | null;

    toasts: ToastMessage[];

    addToast: (toast: ToastMessage) => void;
    removeToast: (id: string) => void;

    setGhost: (ghost: GhostItem | null) => void;

    setSelectedItem: (item: SelectedItem) => void;
    setExpandedItems: (items: string[]) => void;

    reset: () => void;
};
type GhostItem = {
    type: 'note' | 'notebook';
    parentPath: ParentPath;
    index: string; // e.g. '__ghost__'
};

export const useInteractionStore = create<InteractionState>((set) => ({
    selectedItem: null,
    expandedItems: [],
    mode: 'idle',
    ghost: null,
    toasts: [],

    addToast(toast) {
        set((state) => ({
            toasts: [...state.toasts, toast],
        }));
    },
    removeToast(id) {
        set((state) => ({
            toasts: state.toasts.filter((v) => v.id !== id),
        }));
    },

    setGhost(ghost) {
        set({
            ghost,
        });
    },

    setSelectedItem: (item) => set({ selectedItem: item }),
    setExpandedItems: (items) => set({ expandedItems: items }),

    reset: () =>
        set({
            selectedItem: null,
            expandedItems: [],
            mode: 'idle',
        }),
}));
