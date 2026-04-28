// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ROOT_ID } from '../utils/treeAdapter';
import { DraggingPosition, TreeItem } from 'react-complex-tree';
import { FacetTreeItemData } from '@/shared/types/tree.type';
import { useNoteActions } from '@/features/notes';
import { useNotebookActions } from '@/features/notebooks';

export function useItemDrop() {
    const noteActions = useNoteActions();
    const notebookActions = useNotebookActions();

    const handleOnDrop = async (
        items: TreeItem<FacetTreeItemData | null>[],
        target: DraggingPosition,
    ) => {
        const item = items[0];

        if (target.targetType === 'item') {
            if (item.data?.node.parentPath === target.targetItem) return;
            if (item.data?.type === 'note') {
                noteActions.move({
                    id: item.data.node.id,
                    newParentPath: target.targetItem as string,
                });
            } else if (item.data?.type === 'notebook') {
                notebookActions.move({
                    oldPath: item.data.node.path,
                    newParentPath: target.targetItem as string,
                });
            }
        } else if (target.targetType === 'between-items') {
            const parentPath = (target.parentItem === ROOT_ID ? null : target.parentItem) as string;
            if (item.data?.node.parentPath === parentPath) return;
            if (item.data?.type === 'note') {
                noteActions.move({
                    id: item.data.node.id,
                    newParentPath: parentPath,
                });
            } else if (item.data?.type === 'notebook') {
                notebookActions.move({
                    oldPath: item.data.node.path,
                    newParentPath: parentPath,
                });
            }
        } else {
            if (item.data?.node.parentPath === null) return;
            if (item.data?.type === 'note') {
                noteActions.move({ id: item.data.node.id, newParentPath: null });
            } else if (item.data?.type === 'notebook') {
                notebookActions.move({ oldPath: item.data.node.path, newParentPath: null });
            }
        }
    };

    return {
        handleOnDrop,
    };
}
