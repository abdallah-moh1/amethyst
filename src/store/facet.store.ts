// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { create } from 'zustand';
import { FacetNote, FacetNotebook } from '@shared/types/facet.type';

type FacetState = {
    notes: Map<string, FacetNote>;
    notebooks: Map<string, FacetNotebook>;

    setNotes: (notes: FacetNote[]) => void;
    setNotebooks: (notebooks: FacetNotebook[]) => void;

    addNote: (note: FacetNote) => void;
    removeNote: (id: string) => void;

    addNotebook: (notebook: FacetNotebook) => void;
    removeNotebook: (path: string) => void;
};

export const useFacetStore = create<FacetState>((set) => ({
    notes: new Map(),
    notebooks: new Map(),

    setNotes: (notes) =>
        set({
            notes: new Map(notes.map((n) => [n.id, n])),
        }),

    setNotebooks: (notebooks) =>
        set({
            notebooks: new Map(notebooks.map((n) => [n.path, n])),
        }),

    addNote: (note) =>
        set((state) => {
            const notes = new Map(state.notes);
            notes.set(note.id, note);
            return { notes };
        }),

    removeNote: (id) =>
        set((state) => {
            const notes = new Map(state.notes);
            notes.delete(id);
            return { notes };
        }),

    addNotebook: (notebook) =>
        set((state) => {
            const notebooks = new Map(state.notebooks);
            notebooks.set(notebook.path, notebook);
            return { notebooks };
        }),

    removeNotebook: (path) =>
        set((state) => {
            const notebooks = new Map(state.notebooks);
            notebooks.delete(path);
            return { notebooks };
        }),
}));
