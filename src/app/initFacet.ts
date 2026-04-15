// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useFacetStore } from '@/store';
import {
    openFacet,
    onNoteAdded,
    onNoteChanged,
    onNoteRemoved,
    onNotebookAdded,
    onNotebookRemoved,
} from '@/clients/facet.client';

export async function initFacet() {
    const store = useFacetStore.getState();
    const { notes, notebooks } = await openFacet();

    store.setNotes(notes);
    store.setNotebooks(notebooks);

    onNoteAdded(store.addNote);
    onNoteRemoved(store.removeNote);
    onNotebookAdded(store.addNotebook);
    onNotebookRemoved(store.removeNotebook);

    onNoteChanged((note) => {
        console.log(`This note ${note} changed`);

    });
}
