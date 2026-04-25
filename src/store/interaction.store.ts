// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ContextMenuState } from '@/features/context-menu';
import { ToastMessage } from '@/features/toast-notifications/ToastNotifications';
import { getParentRelativePath } from '@/utils';
import { ParentPath } from '@shared/types/facet.type';
import { create } from 'zustand';

export type SelectedItem =
    | { type: 'note'; id: string; path: string }
    | { type: 'notebook'; path: string }
    | null;

type InteractionState = {
    selectedItem: SelectedItem;
    expandedItems: string[];

    ghost: GhostItem | null;
    contextMenu: ContextMenuState;

    renamingItem: RenamingItem;
    setRenamingItem: (item: RenamingItem) => void;

    getResolvedParentPath: () => ParentPath;

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
type RenamingItem = {
    index: string;
} | null;

export const useInteractionStore = create<InteractionState>((set, get) => ({
    selectedItem: null,
    expandedItems: [],
    ghost: null,
    toasts: [],
    contextMenu: null,
    renamingItem: null,

    setRenamingItem(item: RenamingItem) {
        set({ renamingItem: item });
    },

    getResolvedParentPath: () => {
        const { selectedItem } = get();
        if (!selectedItem) return null;

        if (selectedItem.type === 'note') {
            return getParentRelativePath(selectedItem.path);
        }

        return selectedItem.path;
    },

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
