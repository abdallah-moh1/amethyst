// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { SyncedScroll, ViewingMode } from '@/types/workspace.type';

export type WorkspaceStore = {
    viewMode: ViewingMode;
    noteContent: string;
    syncedScroll: SyncedScroll;
    openedNoteId: null | string;
    setViewMode: (mode: ViewingMode) => void;
    setNoteContent: (content: string) => void;
    setSyncedScroll: (syncedScroll: SyncedScroll) => void;
    setOpenedNoteId: (id: string | null) => void;
};
