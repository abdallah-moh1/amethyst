// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, FacetNotebook } from '@shared/types/facet.type';
import { FacetTree } from '@/types/tree.type';
export function buildFacetTree(notes: FacetNote[], notebooks: FacetNotebook[]): FacetTree {
    const tree: FacetTree = {
        root: {
            index: 'root',
            isFolder: true,
            children: [],
            data: null,
        },
    };

    // add notebooks first
    for (const notebook of notebooks) {
        tree[notebook.path] = {
            index: notebook.path,
            isFolder: true,
            children: [],
            data: {
                type: 'notebook',
                node: notebook,
            },
        };

        const parentIndex = notebook.parentPath ?? 'root';
        tree[parentIndex]?.children?.push(notebook.path);
    }

    // add notes
    for (const note of notes) {
        tree[note.id] = {
            index: note.id,
            isFolder: false,
            children: [],
            data: {
                type: 'note',
                node: note,
            },
        };

        const parentIndex = note.parentPath ?? 'root';
        tree[parentIndex]?.children?.push(note.id);
    }

    return tree;
}
