// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ContextMenuState } from '@/features/context-menu';
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

    ghost: GhostItem | null;
    contextMenu: ContextMenuState;

    setContextMenu: (menu: ContextMenuState) => void;

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
    ghost: null,
    toasts: [],
    contextMenu: null,

    setContextMenu(menu) {
        set({
            contextMenu: menu,
        });
    },
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
        }),
}));
