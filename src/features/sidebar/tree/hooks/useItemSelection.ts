import { openNote } from '@/clients/note.client';
import { useFacetStore, useWorkspaceStore } from '@/store';
import { useCallback } from 'react';
import { TreeItemIndex } from 'react-complex-tree';

export function useItemSelection() {
    const tree = useFacetStore((s) => s.tree);
    const selectedItem = useFacetStore((s) => s.selectedItem);


    const setSelectedItem = useFacetStore((s) => s.setSelectedItem);
    const setNoteContent = useWorkspaceStore((s) => s.setNoteContent);


    const selectedItems: TreeItemIndex[] = selectedItem
        ? [selectedItem.type === 'note' ? selectedItem.id : selectedItem.path]
        : [];

    const handleSelectItems = useCallback(
        async (indices: TreeItemIndex[]) => {
            const index = indices[0];
            const rctItem = tree[index];
            if (!rctItem) return;
            const data = rctItem.data;
            if (!data) return;
            if (data.type === 'note') {
                setNoteContent(await openNote(data.node.id));
            }
            setSelectedItem(
                data.type === 'notebook'
                    ? { type: 'notebook', path: data.node.path }
                    : { type: 'note', path: data.node.path, id: data.node.id },
            );
        },
        [tree, setSelectedItem, setNoteContent],
    );
    return {
        handleSelectItems,
        selectedItems,
    };
}
