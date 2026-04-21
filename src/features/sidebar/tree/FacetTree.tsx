// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useRef } from 'react';
import { Tree, ControlledTreeEnvironment, TreeRef } from 'react-complex-tree';
import { useItemSelection } from './hooks/useItemSelection';
import { useItemExpansion } from './hooks/useItemExpansion';
import { useItemPrimaryAction } from './hooks/useItemPrimaryAction';
import { FacetTreeItem } from '@/types/tree.type';
import { useItemRename } from './hooks/useItemRename';
import { useItems } from './hooks/useItems';

import './rct.css';
import { ROOT_ID } from './utils/treeAdapter';
import { useItemDrop } from './hooks/useItemDrop';

export const GHOST_INDEX = '__ghost__';

export function FacetTree() {
    const envRef = useRef<TreeRef<FacetTreeItem>>(null);

    const { items } = useItems();
    const { expandedItems, handleExpandItem, handleCollapseItem } = useItemExpansion();
    const { handlePrimaryAction } = useItemPrimaryAction();
    const { selectedItems, handleSelectItems } = useItemSelection(items);
    const { handleRenameItem, handleAbort } = useItemRename(envRef);
    const { handleOnDrop } = useItemDrop();

    return (
        <ControlledTreeEnvironment
            items={items}
            getItemTitle={(item) => item.data?.node.name ?? ''}
            canDragAndDrop
            canReorderItems
            canDropOnFolder
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
            onDrop={handleOnDrop}
        >
            <Tree treeId="facet" rootItem={ROOT_ID} treeLabel="Facet Tree" ref={envRef} />
        </ControlledTreeEnvironment>
    );
}
