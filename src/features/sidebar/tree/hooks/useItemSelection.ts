import { useFacetStore } from "@/store";
import { useCallback } from "react";
import { TreeItemIndex } from "react-complex-tree";

export function useItemSelection() {
    const tree = useFacetStore((s) => s.tree);
    const selectedItem = useFacetStore((s) => s.selectedItem);
    const setSelectedItem = useFacetStore((s) => s.setSelectedItem);

    const selectedItems: TreeItemIndex[] = selectedItem
        ? [selectedItem.type === 'note' ? selectedItem.id : selectedItem.path]
        : [];

    const handleSelectItems = useCallback(
        (indices: TreeItemIndex[]) => {
            const index = indices[0];
            const rctItem = tree[index];
            if (!rctItem) return;
            const data = rctItem.data;
            if (!data) return;
            setSelectedItem(
                data.type === 'notebook'
                    ? { type: 'notebook', path: data.node.path }
                    : { type: 'note', path: data.node.path, id: data.node.id },
            );
        },
        [tree, setSelectedItem],
    );
    return {
        handleSelectItems,
        selectedItems
    };
}