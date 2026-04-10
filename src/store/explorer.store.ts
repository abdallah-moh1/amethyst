// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ExplorerStore } from '@/types/explorer.type';
import { NoteNode, TreeNode } from '@shared/types/tree.type';
import { create } from 'zustand';

export const useExplorerStore = create<ExplorerStore>((set) => ({
    tree: [],
    expanded: [],
    selectedItem: null,
    isLoading: false,
    error: null,
    pendingCreation: null,

    setTree: (tree) => set({ tree }),
    setExpanded(notebooks: string[]) {
        set({ expanded: notebooks });
    },
    setPendingCreation: (creation) => set({ pendingCreation: creation }),
    setSelectedItem: (item) => set({ selectedItem: item }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () =>
        set({
            tree: [],
            expanded: [],
            selectedItem: null,
            isLoading: false,
            error: null,
        }),
    addNoteToTree: (note) =>
        set((state) => {
            const newNode: NoteNode = {
                type: 'note',
                id: note.id,
                name: note.path.split('/').at(-1)!,
                path: note.path,
            };

            const insertIntoTree = (nodes: TreeNode[]): TreeNode[] =>
                nodes.map((node) => {
                    if (node.type !== 'notebook') return node;

                    // Not an ancestor at all — skip entirely
                    if (!note.path.startsWith(node.path + '/')) return node;

                    const isDirectParent =
                        note.path.split('/').length === node.path.split('/').length + 1;

                    if (isDirectParent) {
                        return { ...node, children: sortNodes([...node.children, newNode]) };
                    }

                    // Is an ancestor but not direct parent — recurse only into this branch
                    return { ...node, children: insertIntoTree(node.children) };
                });

            const isRoot = !note.path.includes('/');
            return {
                tree: isRoot ? sortNodes([...state.tree, newNode]) : insertIntoTree(state.tree),
            };
        }),
    removeNoteFromTree: (noteId) =>
        set((state) => {
            const removeFromNodes = (nodes: TreeNode[]): TreeNode[] =>
                nodes
                    .filter((n) => !(n.type === 'note' && n.id === noteId))
                    .map((n) =>
                        n.type === 'notebook' ? { ...n, children: removeFromNodes(n.children) } : n,
                    );
            return { tree: removeFromNodes(state.tree) };
        }),
    updateNoteInTree: (updatedNote) =>
        set((state) => {
            const update = (nodes: TreeNode[]): TreeNode[] =>
                nodes.map((node) => {
                    if (node.type === 'note' && node.id === updatedNote.id) {
                        return {
                            ...node,
                            name: updatedNote.path.split('/').at(-1)!,
                            path: updatedNote.path,
                        };
                    }
                    if (node.type === 'notebook') {
                        return { ...node, children: update(node.children) };
                    }
                    return node;
                });

            return { tree: update(state.tree) };
        }),
    addNotebookToTree: (notebook) =>
        set((state) => {
            const normalize = (p: string) => p.replace(/\/+$/, '');

            const cleanPath = normalize(notebook.path);

            const newNode: TreeNode = {
                type: 'notebook',
                name: cleanPath.split('/').pop()!,
                path: cleanPath,
                children: [],
            };

            let inserted = false;

            const insertIntoTree = (nodes: TreeNode[]): TreeNode[] =>
                nodes.map((node) => {
                    if (node.type !== 'notebook') return node;

                    const nodePath = normalize(node.path);

                    if (!cleanPath.startsWith(nodePath + '/')) return node;

                    const isDirectParent =
                        cleanPath.split('/').length === nodePath.split('/').length + 1;

                    if (isDirectParent) {
                        // prevent duplicates
                        if (
                            node.children.some(
                                (c) => c.type === 'notebook' && normalize(c.path) === cleanPath,
                            )
                        ) {
                            return node;
                        }

                        inserted = true;

                        return {
                            ...node,
                            children: sortNodes([...node.children, newNode]),
                        };
                    }

                    return {
                        ...node,
                        children: insertIntoTree(node.children),
                    };
                });

            const isRoot = !cleanPath.includes('/');

            if (isRoot) {
                if (
                    state.tree.some((n) => n.type === 'notebook' && normalize(n.path) === cleanPath)
                ) {
                    return state;
                }

                return { tree: sortNodes([...state.tree, newNode]) };
            }

            const newTree = insertIntoTree(state.tree);

            return inserted ? { tree: newTree } : state;
        }),
    removeNotebookFromTree: (targetPath) =>
        set((state) => {
            const normalize = (p: string) => p.replace(/\/+$/, '');
            const cleanTarget = normalize(targetPath);

            const removeFromNodes = (nodes: TreeNode[]): TreeNode[] =>
                nodes
                    .filter((node) => {
                        if (node.type !== 'notebook') return true;

                        const nodePath = normalize(node.path);

                        return !(
                            nodePath === cleanTarget || nodePath.startsWith(cleanTarget + '/')
                        );
                    })
                    .map((node) => {
                        if (node.type === 'notebook') {
                            return {
                                ...node,
                                children: removeFromNodes(node.children),
                            };
                        }
                        return node;
                    });

            return { tree: removeFromNodes(state.tree) };
        }),
    updateNotebookInTree: (oldPath, updatedNotebook) =>
        set((state) => {
            const newPath = updatedNotebook.path;

            const rewritePaths = (nodes: TreeNode[]): TreeNode[] =>
                nodes.map((node) => {
                    // Rewrite any node whose path starts with the old prefix
                    const affected = node.path === oldPath || node.path.startsWith(oldPath + '/');

                    if (!affected) return node;

                    const newNodePath =
                        node.path === oldPath ? newPath : newPath + node.path.slice(oldPath.length);

                    if (node.type === 'note') {
                        return { ...node, path: newNodePath };
                    }

                    // notebook — also recurse into children and update its name if it's the root
                    return {
                        ...node,
                        name:
                            node.path === oldPath
                                ? updatedNotebook.path.split('/').at(-1)!
                                : node.name,
                        path: newNodePath,
                        children: rewritePaths(node.children),
                    };
                });

            return { tree: rewritePaths(state.tree) };
        }),
}));

const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
    return [...nodes].sort((a, b) => {
        // 1. Notebooks first
        if (a.type !== b.type) {
            return a.type === 'notebook' ? -1 : 1;
        }

        // 2. Alphabetical (case-insensitive)
        return a.name.localeCompare(b.name, undefined, {
            sensitivity: 'base',
        });
    });
};
