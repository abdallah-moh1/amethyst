// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { create } from 'zustand';

type WorkspaceState = {
    currentNoteId: string | null;
    noteContent: string;
    noteName: string;

    isDirty: boolean;

    setNewNote: (newNote: { id: string; content: string; name: string } | null) => void;
    setCurrentNoteId: (id: string | null) => void;
    setNoteContent: (content: string) => void;
    setNoteName: (content: string) => void;

    markDirty: () => void;
    markSaved: () => void;

    reset: () => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
    currentNoteId: null,
    noteContent: '',
    isDirty: false,
    noteName: '',

    setNewNote(newNote) {
        if (!newNote)
            return set({
                currentNoteId: null,
                noteContent: '',
                noteName: '',
            });

        const { id, name, content } = newNote;
        return set({
            currentNoteId: id,
            noteContent: content,
            noteName: name,
            // isDirty: false
        });
    },

    setCurrentNoteId: (id) => {
        return set({
            currentNoteId: id,
            isDirty: false,
        });
    },

    setNoteContent: (content) =>
        set({
            noteContent: content,
        }),

    setNoteName: (name) =>
        set({
            noteName: name,
        }),

    markDirty: () => set({ isDirty: true }),
    markSaved: () => set({ isDirty: false }),

    reset: () =>
        set({
            currentNoteId: null,
            noteContent: '',
            isDirty: false,
        }),
}));
