// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useFacetStore } from '@/store';
import { FacetClient } from '@/infrastructure/clients';

export async function initFacet() {
    const store = useFacetStore.getState();
    const { notes, notebooks } = await FacetClient.open();

    store.setNotes(notes);
    store.setNotebooks(notebooks);

    FacetClient.on.noteAdded(store.addNote);
    FacetClient.on.noteRemoved(store.removeNote);
    FacetClient.on.notebookAdded(store.addNotebook);
    FacetClient.on.notebookRemoved(store.removeNotebook);

    FacetClient.on.noteChanged((note) => {
        console.log(`This note ${note} changed`);
    });
}
