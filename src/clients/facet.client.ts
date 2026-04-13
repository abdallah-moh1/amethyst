// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, FacetNotebook } from '@shared/types/facet.type';

export const openFacet = (): Promise<{ notes: FacetNote[]; notebooks: FacetNotebook[]; }> =>
    window.amethyst.facet.open();

export const closeFacet = (): Promise<void> =>
    window.amethyst.facet.close();

export const onNoteAdded = (cb: (note: FacetNote) => void) =>
    window.amethyst.facet.on.noteAdded(cb);

export const onNoteChanged = (cb: (note: FacetNote) => void) =>
    window.amethyst.facet.on.noteChanged(cb);

export const onNoteRemoved = (cb: (id: string) => void) =>
    window.amethyst.facet.on.noteRemoved(cb);

export const onNotebookAdded = (cb: (notebook: FacetNotebook) => void) =>
    window.amethyst.facet.on.notebookAdded(cb);

export const onNotebookRemoved = (cb: (path: string) => void) =>
    window.amethyst.facet.on.notebookRemoved(cb);