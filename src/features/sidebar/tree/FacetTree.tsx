// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useMemo } from 'react';
import { Tree, ControlledTreeEnvironment } from 'react-complex-tree';
import { useFacetStore } from '@/store';
import { buildFacetTree } from './utils/treeAdapter';
import { useItemSelection } from './hooks/useItemSelection';
import { useItemExpansion } from './hooks/useItemExpansion';
import { useItemPrimaryAction } from './hooks/useItemPrimaryAction';

import './rct.css';

export function FacetTree() {
    // 1. Grab the raw Maps from your new store
    const notesMap = useFacetStore((state) => state.notes);
    const notebooksMap = useFacetStore((state) => state.notebooks);

    // 2. Derive the tree dynamically. It will auto-update whenever the Maps change.
    const items = useMemo(() => {
        // Convert the Maps back to Arrays since buildFacetTree expects arrays
        const notesArray = Array.from(notesMap.values());
        const notebooksArray = Array.from(notebooksMap.values());

        return buildFacetTree(notesArray, notebooksArray);
    }, [notesMap, notebooksMap]);

    const { selectedItems, handleSelectItems } = useItemSelection(items);
    const { expandedItems, handleExpandItem, handleCollapseItem } = useItemExpansion();
    const { handlePrimaryAction } = useItemPrimaryAction();
    return (
        <ControlledTreeEnvironment
            items={items}
            getItemTitle={(item) => item.data?.node.name ?? 'Root'}
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
        >
            <Tree treeId="facet" rootItem="root" treeLabel="Facet Tree" />
        </ControlledTreeEnvironment>
    );
}
