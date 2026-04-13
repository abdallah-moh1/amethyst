// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { buildFacetTree } from '@/features/sidebar/tree/utils/treeAdapter';
import { FacetStore } from '@/types/stores.type';
import { FacetNote } from '@shared/types/facet.type';
import { create } from 'zustand';
import { useWorkspaceStore } from './workspace.store';

function deserializeNote(note: FacetNote): FacetNote {
    return {
        ...note,
        createdAt: new Date(note.createdAt),
        modifiedAt: new Date(note.modifiedAt),
    };
}

export const useFacetStore = create<FacetStore>((set) => ({
    tree: buildFacetTree([], []),
    notes: [],
    notebooks: [],
    selectedItem: null,
    expandedItems: [],

    setExpandedItems(expanded) {
        set({ expandedItems: expanded });
    },

    setSelectedItem(item) {
        set({ selectedItem: item });
    },

    hydrate: (notes, notebooks) => {
        const deserialized = notes.map(deserializeNote);
        set({
            notes: deserialized,
            notebooks,
            tree: buildFacetTree(deserialized, notebooks),
        });
    },

    addNote: (note) =>
        set((s) => {
            const deserialized = deserializeNote(note);
            const parentIndex = deserialized.parentPath ?? 'root';
            return {
                notes: [...s.notes, deserialized],
                tree: {
                    ...s.tree,
                    [deserialized.id]: {
                        index: deserialized.id,
                        isFolder: false,
                        children: [],
                        data: { type: 'note', node: deserialized },
                    },
                    [parentIndex]: {
                        ...s.tree[parentIndex],
                        children: [...(s.tree[parentIndex]?.children ?? []), deserialized.id],
                    },
                },
            };
        }),

    updateNote: (note) =>
        set((s) => {
            const deserialized = deserializeNote(note);
            const oldNote = s.notes.find((n) => n.id === deserialized.id);
            const notes = s.notes.map((n) => (n.id === deserialized.id ? deserialized : n));

            if (oldNote && oldNote.parentPath !== deserialized.parentPath) {
                const oldParent = oldNote.parentPath ?? 'root';
                const newParent = deserialized.parentPath ?? 'root';
                return {
                    notes,
                    tree: {
                        ...s.tree,
                        [deserialized.id]: {
                            ...s.tree[deserialized.id],
                            data: { type: 'note', node: deserialized },
                        },
                        [oldParent]: {
                            ...s.tree[oldParent],
                            children:
                                s.tree[oldParent].children?.filter((c) => c !== deserialized.id) ??
                                [],
                        },
                        [newParent]: {
                            ...s.tree[newParent],
                            children: [...(s.tree[newParent]?.children ?? []), deserialized.id],
                        },
                    },
                };
            }

            return {
                notes,
                tree: {
                    ...s.tree,
                    [deserialized.id]: {
                        ...s.tree[deserialized.id],
                        data: { type: 'note', node: deserialized },
                    },
                },
            };
        }),

    removeNote: (id) =>
        set((s) => {
            const note = s.notes.find((n) => n.id === id);
            const parentIndex = note?.parentPath ?? 'root';
            const tree = { ...s.tree };
            delete tree[id];

            if (useWorkspaceStore.getState().currentNoteId === note?.id) {
                useWorkspaceStore.getState().setCurrentNoteId(null);
                useWorkspaceStore.getState().setNoteContent("");
                useWorkspaceStore.getState().setNoteName("");
            }

            return {
                notes: s.notes.filter((n) => n.id !== id),
                selectedItem: s.selectedItem?.type === 'note' && s.selectedItem.id === note?.id ? null : s.selectedItem,
                tree: {
                    ...tree,
                    [parentIndex]: {
                        ...tree[parentIndex],
                        children: tree[parentIndex]?.children?.filter((c) => c !== id) ?? [],
                    },
                },
            };
        }),

    addNotebook: (notebook) =>
        set((s) => {
            const parentIndex = notebook.parentPath ?? 'root';
            return {
                notebooks: [...s.notebooks, notebook],
                tree: {
                    ...s.tree,
                    [notebook.path]: {
                        index: notebook.path,
                        isFolder: true,
                        children: [],
                        data: { type: 'notebook', node: notebook },
                    },
                    [parentIndex]: {
                        ...s.tree[parentIndex],
                        children: [...(s.tree[parentIndex]?.children ?? []), notebook.path],
                    },
                },
            };
        }),

    updateNotebook: ({ oldPath, notebook }) =>
        set((s) => {
            const tree = { ...s.tree };
            const oldItem = tree[oldPath];
            const oldParent = s.notebooks.find((n) => n.path === oldPath)?.parentPath ?? 'root';
            const newParent = notebook.parentPath ?? 'root';

            delete tree[oldPath];

            tree[notebook.path] = {
                ...oldItem,
                index: notebook.path,
                data: { type: 'notebook', node: notebook },
            };

            if (oldPath !== notebook.path) {
                tree[oldParent] = {
                    ...tree[oldParent],
                    children:
                        tree[oldParent]?.children?.map((c) =>
                            c === oldPath ? notebook.path : c,
                        ) ?? [],
                };

                if (oldParent !== newParent) {
                    tree[newParent] = {
                        ...tree[newParent],
                        children: [...(tree[newParent]?.children ?? []), notebook.path],
                    };
                }
            }

            return {
                notebooks: s.notebooks.map((n) => (n.path === oldPath ? notebook : n)),
                tree,
            };
        }),

    removeNotebook: (path) =>
        set((s) => {
            const notebook = s.notebooks.find((n) => n.path === path);
            const parentIndex = notebook?.parentPath ?? 'root';
            const tree = { ...s.tree };
            delete tree[path];
            return {
                notebooks: s.notebooks.filter((n) => n.path !== path),
                tree: {
                    ...tree,
                    [parentIndex]: {
                        ...tree[parentIndex],
                        children: tree[parentIndex]?.children?.filter((c) => c !== path) ?? [],
                    },
                },
            };
        }),
}));
