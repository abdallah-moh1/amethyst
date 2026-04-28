// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetCommands } from '@/core/commands';
import { ROOT_ID } from '../utils/treeAdapter';
import { DraggingPosition, TreeItem } from 'react-complex-tree';
import { FacetTreeItemData } from '@/shared/types/tree.type';
import { CommandRunner } from '@/core/commands';

export function useItemDrop() {
    const handleOnDrop = async (
        items: TreeItem<FacetTreeItemData | null>[],
        target: DraggingPosition,
    ) => {
        const item = items[0];

        if (target.targetType === 'item') {
            if (item.data?.node.parentPath === target.targetItem) return;
            if (item.data?.type === 'note') {
                CommandRunner.execute(
                    FacetCommands.MOVE_NOTE,
                    item.data.node.id,
                    target.targetItem,
                );
            } else if (item.data?.type === 'notebook') {
                CommandRunner.execute(
                    FacetCommands.MOVE_NOTEBOOK,
                    item.data.node.path,
                    target.targetItem,
                );
            }
        } else if (target.targetType === 'between-items') {
            if (
                item.data?.node.parentPath ===
                (target.parentItem === ROOT_ID ? null : target.parentItem)
            )
                return;
            if (item.data?.type === 'note') {
                CommandRunner.execute(
                    FacetCommands.MOVE_NOTE,
                    item.data.node.id,
                    target.parentItem === ROOT_ID ? null : target.parentItem,
                );
            } else if (item.data?.type === 'notebook') {
                CommandRunner.execute(
                    FacetCommands.MOVE_NOTEBOOK,
                    item.data.node.path,
                    target.parentItem === ROOT_ID ? null : target.parentItem,
                );
            }
        } else {
            if (item.data?.node.parentPath === null) return;
            if (item.data?.type === 'note') {
                CommandRunner.execute(FacetCommands.MOVE_NOTE, item.data.node.id, null);
            } else if (item.data?.type === 'notebook') {
                CommandRunner.execute(FacetCommands.MOVE_NOTEBOOK, item.data.node.path, null);
            }
        }
    };
    return {
        handleOnDrop,
    };
}
