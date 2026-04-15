// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { create } from 'zustand';

export type ViewMode = 'editor' | 'preview' | 'split-view';

type UIState = {
    viewMode: ViewMode;

    sidebar: {
        collapsed: boolean;
        width: number;
    };

    rightPanel: {
        collapsed: boolean;
        width: number;
    };

    setViewMode: (mode: ViewMode) => void;

    toggleSidebar: () => void;
    setSidebarWidth: (width: number) => void;

    toggleRightPanel: () => void;
    setRightPanelWidth: (width: number) => void;
};

export const useUIStore = create<UIState>((set) => ({
    viewMode: 'split-view',

    sidebar: {
        collapsed: false,
        width: 280,
    },

    rightPanel: {
        collapsed: false,
        width: 300,
    },

    setViewMode: (mode) => set({ viewMode: mode }),

    toggleSidebar: () =>
        set((state) => ({
            sidebar: {
                ...state.sidebar,
                collapsed: !state.sidebar.collapsed,
            },
        })),

    setSidebarWidth: (width) =>
        set((state) => ({
            sidebar: {
                ...state.sidebar,
                width,
            },
        })),

    toggleRightPanel: () =>
        set((state) => ({
            rightPanel: {
                ...state.rightPanel,
                collapsed: !state.rightPanel.collapsed,
            },
        })),

    setRightPanelWidth: (width) =>
        set((state) => ({
            rightPanel: {
                ...state.rightPanel,
                width,
            },
        })),
}));