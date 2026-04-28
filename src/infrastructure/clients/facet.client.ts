// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, FacetNotebook } from '@shared/types/facet.type';

export class FacetClient {
    static open(): Promise<{ notes: FacetNote[]; notebooks: FacetNotebook[] }> {
        return window.amethyst.facet.open();
    }

    static close(): Promise<void> {
        return window.amethyst.facet.close();
    }

    static on = {
        noteAdded: (cb: (note: FacetNote) => void): (() => void) =>
            window.amethyst.facet.on.noteAdded(cb),

        noteChanged: (cb: (note: FacetNote) => void): (() => void) =>
            window.amethyst.facet.on.noteChanged(cb),

        noteRemoved: (cb: (id: string) => void): (() => void) =>
            window.amethyst.facet.on.noteRemoved(cb),

        notebookAdded: (cb: (notebook: FacetNotebook) => void): (() => void) =>
            window.amethyst.facet.on.notebookAdded(cb),

        notebookRemoved: (cb: (path: string) => void): (() => void) =>
            window.amethyst.facet.on.notebookRemoved(cb),
    };
}
