// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { SyncedScroll, ViewingMode } from '@/types/workspace.type';
import { FacetTree } from './tree.type';
import { FacetNote, FacetNotebook } from '@shared/types/facet.type';

export type WorkspaceStore = {
    viewMode: ViewingMode;
    noteContent: string;
    syncedScroll: SyncedScroll;
    currentNoteId: string | null;
    noteName: string | null;
    setNoteName: (name: string) => void;
    setViewMode: (mode: ViewingMode) => void;
    setCurrentNoteId: (id: string | null) => void;
    setNoteContent: (content: string) => void;
    setSyncedScroll: (syncedScroll: SyncedScroll) => void;
};

export type SelectedItem =
    | {
          path: string;
          type: 'note';
          id: string;
      }
    | {
          path: string;
          type: 'notebook';
      }
    | null;

export type FacetStore = {
    tree: FacetTree;
    notes: FacetNote[];
    notebooks: FacetNotebook[];
    selectedItem: SelectedItem;
    expandedItems: string[];

    setExpandedItems: (expanded: string[]) => void;
    setSelectedItem: (item: SelectedItem) => void;

    hydrate: (notes: FacetNote[], notebooks: FacetNotebook[]) => void;

    addNote: (note: FacetNote) => void;
    updateNote: (note: FacetNote) => void;
    removeNote: (id: string) => void;

    addNotebook: (notebook: FacetNotebook) => void;
    updateNotebook: (payload: { oldPath: string; notebook: FacetNotebook }) => void;
    removeNotebook: (path: string) => void;
};
