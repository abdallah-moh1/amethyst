// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, FacetNotebook } from '@shared/types/facet.type';
import { FacetTree } from '@/types/tree.type';

export const ROOT_ID = '__rct_root__';

export function buildFacetTree(notes: FacetNote[], notebooks: FacetNotebook[]): FacetTree {
    const tree: FacetTree = {};

    // 1. Initialize the Root
    tree[ROOT_ID] = {
        index: ROOT_ID,
        isFolder: true,
        children: [],
        data: null,
    };

    // 2. CREATE ALL NODES FIRST (The "Registration" Pass)
    // This solves the "child before parent" issue because every possible 
    // destination now exists in the 'tree' object before we link them.
    for (const notebook of notebooks) {
        tree[notebook.path] = {
            index: notebook.path,
            isFolder: true,
            children: [],
            data: { type: 'notebook', node: notebook },
        };
    }

    for (const note of notes) {
        tree[note.id] = {
            index: note.id,
            isFolder: false,
            children: [],
            data: { type: 'note', node: note },
        };
    }

    // 3. LINK CHILDREN TO PARENTS
    // Now we can safely push children because the parents are guaranteed to exist.
    for (const notebook of notebooks) {
        const parentIndex = notebook.parentPath ?? ROOT_ID;
        // If the parent doesn't exist (e.g. broken path), fallback to ROOT
        const target = tree[parentIndex] ? parentIndex : ROOT_ID;
        tree[target]?.children?.push(notebook.path);
    }

    for (const note of notes) {
        const parentIndex = note.parentPath ?? ROOT_ID;
        const target = tree[parentIndex] ? parentIndex : ROOT_ID;
        tree[target]?.children?.push(note.id);
    }

    // 4. THE "BETTER SORTER"
    // Instead of sorting the input arrays, we sort the 'children' arrays 
    // inside each folder. This ensures the UI displays them alphabetically.
    for (const node of Object.values(tree)) {
        if (node.isFolder && node.children && node.children.length > 0) {
            node.children.sort((a, b) => {
                const nodeA = tree[a];
                const nodeB = tree[b];

                // Folders (notebooks) always come before files (notes)
                if (nodeA.isFolder && !nodeB.isFolder) return -1;
                if (!nodeA.isFolder && nodeB.isFolder) return 1;

                // Sort alphabetically by name within their groups
                const nameA = nodeA.data?.node?.name ?? '';
                const nameB = nodeB.data?.node?.name ?? '';
                return nameA.localeCompare(nameB);
            });
        }
    }

    return tree;
}