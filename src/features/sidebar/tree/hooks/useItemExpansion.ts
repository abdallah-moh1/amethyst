import { addExpandedNotebook, removeExpandedNotebook } from '@/clients/workspace.client';
import { useExplorerStore } from '@/store';
import { TreeItemData } from '@shared/types/tree.type';
import { RefObject, useCallback, useEffect } from 'react';
import { TreeItem, TreeItemIndex, TreeRef } from 'react-complex-tree';
import { GHOST_ID } from './useTreeItems';

export function useItemExpansion(treeRef: RefObject<TreeRef<TreeItemData> | null>) {
    const expanded = useExplorerStore((s) => s.expanded);
    const pendingCreation = useExplorerStore((s) => s.pendingCreation);

    const setExpanded = useExplorerStore((s) => s.setExpanded);

    const expandedItems: TreeItemIndex[] = expanded;

    const handleExpandItem = useCallback(
        (item: TreeItem<TreeItemData>) => {
            const path = item.index as string;
            setExpanded([...expanded, path]);
            addExpandedNotebook(path);
        },
        [expanded, setExpanded],
    );

    const handleCollapseItem = useCallback(
        (item: TreeItem<TreeItemData>) => {
            const path = item.index as string;
            setExpanded(expanded.filter((p) => p !== path));
            removeExpandedNotebook(path);
        },
        [expanded, setExpanded],
    );

    useEffect(() => {
        if (!pendingCreation) return;

        // ✅ Ensure parent is expanded
        if (pendingCreation.parentPath) {
            const already = expanded.includes(pendingCreation.parentPath);
            if (!already) {
                setExpanded([...expanded, pendingCreation.parentPath]);
                addExpandedNotebook(pendingCreation.parentPath);
            }
        }

        // ✅ Start renaming ghost
        const id = setTimeout(() => {
            if (!treeRef) return;
            treeRef.current?.startRenamingItem(GHOST_ID);
        }, 30);

        return () => clearTimeout(id);
    }, [pendingCreation]);

    return { handleExpandItem, handleCollapseItem, expandedItems };
}
