// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { LucideProps } from 'lucide-react';

export type ViewModeSwitcherBtnProps = {
    mode: ViewingMode;
    width?: number;
    Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
};

export type WorkspaceStore = {
    viewMode: ViewingMode;
    noteContent: string;
    openedNoteId: null | string;
    setViewMode: (mode: ViewingMode) => void;
    setNoteContent: (content: string) => void;
    setOpenedNoteId: (id: string | null) => void;
};

export type ViewingMode = 'editor' | 'preview' | 'split-view';