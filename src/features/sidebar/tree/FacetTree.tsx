// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useRef } from 'react';
import { Tree, ControlledTreeEnvironment, TreeRef } from 'react-complex-tree';
import { useItemSelection } from './hooks/useItemSelection';
import { useItemExpansion } from './hooks/useItemExpansion';
import { useItemPrimaryAction } from './hooks/useItemPrimaryAction';
import { FacetTreeItemData } from '@/types/tree.type';
import { useItemRename } from './hooks/useItemRename';
import { useItems } from './hooks/useItems';
import { ROOT_ID } from './utils/treeAdapter';
import { useItemDrop } from './hooks/useItemDrop';
import { ContextMenu } from '@/features/context-menu';

import './rct.css';

export const GHOST_INDEX = '__ghost__';

export function FacetTree() {
    const envRef = useRef<TreeRef<FacetTreeItemData>>(null);

    const { items, contextMenu, renderItems } = useItems(envRef);
    const { expandedItems, handleExpandItem, handleCollapseItem } = useItemExpansion();
    const { selectedItems, handleSelectItems } = useItemSelection(items);
    const { handlePrimaryAction } = useItemPrimaryAction();
    const { handleRenameItem, handleAbort } = useItemRename(envRef);
    const { handleOnDrop } = useItemDrop();

    return (
        <>
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
                renderItem={renderItems}
            >
                <Tree treeId="facet" rootItem={ROOT_ID} treeLabel="Facet Tree" ref={envRef} />
            </ControlledTreeEnvironment>
            <ContextMenu {...contextMenu} />
        </>
    );
}
