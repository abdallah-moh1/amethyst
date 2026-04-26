// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useInteractionStore } from '@/store';
import { RefObject, useCallback, useEffect } from 'react';
import { GHOST_INDEX } from '../FacetTree';
import { FacetTree, FacetTreeItem, FacetTreeItemData } from '@/types/tree.type';
import { commands, FacetCommands } from '@/features/commands';
import { TreeRef } from 'react-complex-tree';
import { CommandExecutionResult } from '@/types/command.type';

export function useItemRename(
    treeRef: RefObject<TreeRef<FacetTreeItemData> | null>,
    items: FacetTree,
) {
    const ghost = useInteractionStore((s) => s.ghost);
    const setGhost = useInteractionStore((s) => s.setGhost);
    const addToast = useInteractionStore((s) => s.addToast);
    const renamingItem = useInteractionStore((s) => s.renamingItem);
    const setRenamingItem = useInteractionStore((s) => s.setRenamingItem);

    const expandedItems = useInteractionStore((s) => s.expandedItems);
    const setExpandedItems = useInteractionStore((s) => s.setExpandedItems);

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
    }, [ghost]);

    // As soon as the ghost appears, tell RCT to start renaming it
    useEffect(() => {
        if (renamingItem && items[renamingItem.index]) {
            treeRef.current?.startRenamingItem(renamingItem.index);
        }
    }, [renamingItem]);

    const handleRenameItem = useCallback(
        async (item: FacetTreeItem, newName: string) => {
            let result: CommandExecutionResult | null = null;

            if (item.index === GHOST_INDEX && ghost) {
                if (ghost.type === 'note') {
                    result = await commands.execute(
                        FacetCommands.CREATE_NOTE,
                        ghost.parentPath,
                        newName,
                    );
                } else {
                    result = await commands.execute(
                        FacetCommands.CREATE_NOTEBOOK,
                        ghost.parentPath,
                        newName,
                    );
                }
                setGhost(null);
            } else {
                if (item.data?.type === 'note') {
                    result = await commands.execute(
                        FacetCommands.RENAME_NOTE,
                        item.data.node.id,
                        newName,
                    );
                } else if (item.data?.type === 'notebook') {
                    result = await commands.execute(
                        FacetCommands.RENAME_NOTEBOOK,
                        item.data.node.path,
                        newName,
                    );
                }
            }
            if (result && !result?.success) {
                addToast({
                    id: Date.now().toString(),
                    message: result.message,
                    duration: 4000,
                    type: 'error',
                });
            }
            setRenamingItem(null);
        },
        [ghost, setRenamingItem, setGhost, addToast],
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
