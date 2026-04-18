// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useRef } from 'react';
import {
    Tree,
    ControlledTreeEnvironment,
    TreeRef,
    TreeItem,
    DraggingPosition,
} from 'react-complex-tree';
import { useItemSelection } from './hooks/useItemSelection';
import { useItemExpansion } from './hooks/useItemExpansion';
import { useItemPrimaryAction } from './hooks/useItemPrimaryAction';
import { FacetTreeItem, FacetTreeItemData } from '@/types/tree.type';
import { useItemRename } from './hooks/useItemRename';
import { useItems } from './hooks/useItems';

import './rct.css';
import { commands, FacetCommands } from '@/features/commands';

export const GHOST_INDEX = '__ghost__';

export function FacetTree() {
    const envRef = useRef<TreeRef<FacetTreeItem>>(null);

    const { items } = useItems();
    const { expandedItems, handleExpandItem, handleCollapseItem } = useItemExpansion();
    const { handlePrimaryAction } = useItemPrimaryAction();
    const { selectedItems, handleSelectItems } = useItemSelection(items);
    const { handleRenameItem, handleAbort } = useItemRename(envRef);

    const handleOnDrop = (
        items: TreeItem<FacetTreeItemData | null>[],
        target: DraggingPosition,
    ) => {
        const item = items[0];

        if (target.targetType === 'item') {
            if (item.data?.type === 'note') {
                commands.execute(FacetCommands.MOVE_NOTE, item.data.node.id, target.targetItem);
            } else if (item.data?.type === 'notebook') {
                commands.execute(
                    FacetCommands.MOVE_NOTEBOOK,
                    item.data.node.path,
                    target.targetItem,
                );
            }
        } else if (target.targetType === 'between-items') {
            if (item.data?.type === 'note') {
                commands.execute(FacetCommands.MOVE_NOTE, item.data.node.id, target.parentItem);
            } else if (item.data?.type === 'notebook') {
                commands.execute(
                    FacetCommands.MOVE_NOTEBOOK,
                    item.data.node.path,
                    target.parentItem,
                );
            }
        } else {
            if (item.data?.type === 'note') {
                commands.execute(FacetCommands.MOVE_NOTE, item.data.node.id, null);
            } else if (item.data?.type === 'notebook') {
                commands.execute(FacetCommands.MOVE_NOTEBOOK, item.data.node.path, null);
            }
        }
    };

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
            <Tree treeId="facet" rootItem="root" treeLabel="Facet Tree" ref={envRef} />
        </ControlledTreeEnvironment>
    );
}
