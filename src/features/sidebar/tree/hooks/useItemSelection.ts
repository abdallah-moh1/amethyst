// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useInteractionStore } from '@/store';
import { FacetTree } from '@/types/tree.type';
import { useCallback } from 'react';
import { TreeItemIndex } from 'react-complex-tree';

export function useItemSelection(items: FacetTree) {
    const selectedItem = useInteractionStore((s) => s.selectedItem);
    const setSelectedItem = useInteractionStore((s) => s.setSelectedItem);

    const selectedItems: TreeItemIndex[] = selectedItem
        ? [selectedItem.type === 'note' ? selectedItem.id : selectedItem.path]
        : [];

    const handleSelectItems = useCallback(
        (indices: TreeItemIndex[]) => {
            const index = indices[0];
            if (!index) {
                setSelectedItem(null);
                return;
            }

            const rctItem = items[index];
            if (!rctItem?.data) return;

            const { data } = rctItem;

            setSelectedItem(
                data.type === 'note'
                    ? { type: 'note', id: data.node.id, path: data.node.path }
                    : { type: 'notebook', path: data.node.path },
            );
        },
        [items, setSelectedItem],
    );

    return { handleSelectItems, selectedItems };
}
