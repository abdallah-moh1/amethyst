// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useFacetStore, useInteractionStore } from '@/store';
import { RefObject, useCallback, useEffect } from 'react';
import { GHOST_INDEX } from '../FacetTree';
import { FacetTreeItem, FacetTreeItemData } from '@/types/tree.type';
import { commands, FacetCommands } from '@/features/commands';
import { TreeRef } from 'react-complex-tree';
import { CommandExecutionResult } from '@/types/command.type';
import { createNotebook } from '@/clients/notebook.client';
import { createNote } from '@/clients/note.client';

export function useItemRename(treeRef: RefObject<TreeRef<FacetTreeItemData> | null>) {
    const ghost = useInteractionStore((s) => s.ghost);
    const setGhost = useInteractionStore((s) => s.setGhost);
    const addToast = useInteractionStore((s) => s.addToast);

    const addNote = useFacetStore((s) => s.addNote);
    const addNotebook = useFacetStore((s) => s.addNotebook);

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
    }, [ghost, treeRef, expandedItems, setExpandedItems]);

    const handleRenameItem = useCallback(
        async (item: FacetTreeItem, newName: string) => {
            let result: CommandExecutionResult | null = null;

            if (item.index === GHOST_INDEX && ghost) {
                if (ghost.type === 'note') {
                    try {
                        const note = await createNote(ghost.parentPath, newName);
                        addNote(note);
                        result = { success: true };
                    } catch (error) {
                        result = {
                            success: false,
                            message:
                                error instanceof Error ? error.message : 'Failed to create note',
                        };
                    }
                } else {
                    try {
                        const notebook = await createNotebook(ghost.parentPath, newName);
                        addNotebook(notebook);
                        result = { success: true };
                    } catch (error) {
                        result = {
                            success: false,
                            message:
                                error instanceof Error
                                    ? error.message
                                    : 'Failed to create notebook',
                        };
                    }
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
        },
        [ghost, setGhost, addToast, addNote, addNotebook],
    );

    const handleAbort = useCallback(() => {
        // User pressed Escape — discard the ghost
        setGhost(null);
    }, [setGhost]);

    return {
        handleRenameItem,
        handleAbort,
    };
}
