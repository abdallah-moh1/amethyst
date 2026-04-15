// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Tree, ControlledTreeEnvironment, TreeRef } from 'react-complex-tree';
import { useFacetStore, useInteractionStore } from '@/store';
import { buildFacetTree } from './utils/treeAdapter';
import { useItemSelection } from './hooks/useItemSelection';
import { useItemExpansion } from './hooks/useItemExpansion';
import { useItemPrimaryAction } from './hooks/useItemPrimaryAction';

import './rct.css';
import { FacetTreeItem } from '@/types/tree.type';
import { createNote } from '@/clients/note.client';
import { createNotebook } from '@/clients/notebook.client';

export const GHOST_INDEX = '__ghost__';

export function FacetTree() {
    const envRef = useRef<TreeRef<FacetTreeItem>>(null);

    const notesMap = useFacetStore((s) => s.notes);
    const notebooksMap = useFacetStore((s) => s.notebooks);

    const addNote = useFacetStore((s) => s.addNote);
    const addNotebook = useFacetStore((s) => s.addNotebook);

    const ghost = useInteractionStore((s) => s.ghost);
    const setGhost = useInteractionStore((s) => s.setGhost);

    const setExpandedItems = useInteractionStore((s) => s.setExpandedItems);

    const baseItems = useMemo(
        () => buildFacetTree(Array.from(notesMap.values()), Array.from(notebooksMap.values())),
        [notesMap, notebooksMap],
    );

    // Inject ghost into the tree if one exists
    const items = useMemo(() => {
        if (!ghost) return baseItems;

        const parentIndex = ghost.parentPath ?? 'root';
        const injected = { ...baseItems };

        // Clone the parent so we don't mutate
        injected[parentIndex] = {
            ...injected[parentIndex],
            children: [...(injected[parentIndex]?.children ?? []), GHOST_INDEX],
        };

        injected[GHOST_INDEX] = {
            index: GHOST_INDEX,
            isFolder: ghost.type === 'notebook',
            children: [],
            data: null, // RCT will render it as '' via getItemTitle
        };

        return injected;
    }, [baseItems, ghost]);

    const { selectedItems, handleSelectItems } = useItemSelection(items);
    const { expandedItems, handleExpandItem, handleCollapseItem } = useItemExpansion();
    const { handlePrimaryAction } = useItemPrimaryAction();

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
                envRef.current?.startRenamingItem(GHOST_INDEX);
            }, 0);
            return () => clearTimeout(id);
        }
    }, [ghost]);

    const handleRenameItem = useCallback(
        async (item: FacetTreeItem, newName: string) => {
            console.log(item);

            if (item.index === GHOST_INDEX && ghost) {
                if (ghost.type === 'note') {
                    addNote(await createNote(newName, ghost.parentPath));
                } else {
                    addNotebook(await createNotebook(ghost.parentPath, newName));
                }
                setGhost(null);
            }
        },
        [ghost, setGhost, addNote, addNotebook],
    );

    const handleAbort = useCallback(() => {
        // User pressed Escape — discard the ghost
        setGhost(null);
    }, [setGhost]);

    return (
        <ControlledTreeEnvironment
            items={items}
            getItemTitle={(item) => item.data?.node.name ?? ''}
            viewState={{
                facet: {
                    expandedItems,
                    selectedItems,
                },
            }}
            onSelectItems={handleSelectItems}
            onExpandItem={handleExpandItem}
            onCollapseItem={handleCollapseItem}
            onPrimaryAction={handlePrimaryAction}
            onRenameItem={handleRenameItem}
            onAbortRenamingItem={handleAbort}
        >
            <Tree treeId="facet" rootItem="root" treeLabel="Facet Tree" ref={envRef} />
        </ControlledTreeEnvironment>
    );
}
