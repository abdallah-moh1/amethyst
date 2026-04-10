import { useExplorerStore } from "@/store";
import { RCTItems } from "@shared/types/tree.type";
import { useCallback } from "react";
import { TreeItemIndex } from "react-complex-tree";
import { GHOST_ID } from "./useTreeItems";

export function useItemSelection(items: RCTItems) {
    const selectedItem = useExplorerStore((s) => s.selectedItem);
    const setSelectedItem = useExplorerStore((s) => s.setSelectedItem);

    const selectedItems: TreeItemIndex[] = selectedItem
        ? [selectedItem.type === 'note' ? selectedItem.id : selectedItem.path]
        : [];

    // onSelectItems: only responsible for tracking which item is highlighted.
    const handleSelectItems = useCallback(
        (indices: TreeItemIndex[]) => {
            const index = indices[0];
            if (index == null || index === GHOST_ID) return;
            const rctItem = items[index];
            if (!rctItem) return;
            const data = rctItem.data;
            setSelectedItem(
                data.kind === 'note'
                    ? { type: data.kind, path: data.node.path, id: data.node.id }
                    : { type: data.kind, path: data.node.path },
            );
        },
        [items, setSelectedItem],
    );

    return {
        selectedItems,
        handleSelectItems
    };
}