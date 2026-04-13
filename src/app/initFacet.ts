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
    store.hydrate(notes, notebooks);

    onNoteAdded(store.addNote);
    onNoteChanged(store.updateNote);
    onNoteRemoved(store.removeNote);
    onNotebookAdded(store.addNotebook);
    onNotebookRemoved(store.removeNotebook);
}
