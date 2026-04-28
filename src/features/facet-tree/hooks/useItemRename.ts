// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useInteractionStore } from '@/store';
import { RefObject, useCallback, useEffect } from 'react';
import { GHOST_INDEX } from '../FacetTree';
import { FacetTree, FacetTreeItem, FacetTreeItemData } from '@/shared/types/tree.type';
import { TreeRef } from 'react-complex-tree';
import { useNoteActions } from '@/features/notes';
import { useNotebookActions } from '@/features/notebooks';

export function useItemRename(
    treeRef: RefObject<TreeRef<FacetTreeItemData> | null>,
    items: FacetTree,
) {
    const ghost = useInteractionStore((s) => s.ghost);
    const setGhost = useInteractionStore((s) => s.setGhost);
    const renamingItem = useInteractionStore((s) => s.renamingItem);
    const setRenamingItem = useInteractionStore((s) => s.setRenamingItem);

    const expandedItems = useInteractionStore((s) => s.expandedItems);
    const setExpandedItems = useInteractionStore((s) => s.setExpandedItems);

    const noteActions = useNoteActions();
    const notebookActions = useNotebookActions();

    // As soon as the ghost appears, tell RCT to start renaming it
    useEffect(() => {
        if (ghost) {
            // Small delay — RCT needs one render to mount the item first
            if (ghost.parentPath) {
                const already = expandedItems.includes(ghost.parentPath);
                if (!already) {
                    setExpandedItems([...expandedItems, ghost.parentPath]);
                }
            }
            const id = setTimeout(() => {
                treeRef.current?.startRenamingItem(GHOST_INDEX);
            }, 0);
            return () => clearTimeout(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ghost]);

    // As soon as the ghost appears, tell RCT to start renaming it
    useEffect(() => {
        if (renamingItem && items[renamingItem.index]) {
            treeRef.current?.startRenamingItem(renamingItem.index);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renamingItem]);

    const handleRenameItem = useCallback(
        async (item: FacetTreeItem, newName: string) => {
            if (item.index === GHOST_INDEX && ghost) {
                if (ghost.type === 'note') {
                    noteActions.create({
                        parentPath: ghost.parentPath,
                        name: newName,
                    });
                } else {
                    notebookActions.create({ parentPath: ghost.parentPath, name: newName });
                }
                setGhost(null);
            } else {
                if (item.data?.type === 'note') {
                    noteActions.rename({ id: item.data.node.id, newName });
                } else if (item.data?.type === 'notebook') {
                    notebookActions.rename({
                        path: item.data.node.path,
                        newName,
                    });
                }
            }

            setRenamingItem(null);
        },
        [ghost, setRenamingItem, setGhost, noteActions, notebookActions],
    );

    const handleAbort = useCallback(() => {
        // User pressed Escape — discard the ghost
        setGhost(null);
        setRenamingItem(null);
    }, [setGhost, setRenamingItem]);

    return {
        handleRenameItem,
        handleAbort,
    };
}
