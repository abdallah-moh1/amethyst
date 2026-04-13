import { useFacetStore } from '@/store';
import { FacetTreeItem } from '@/types/tree.type';
import { useCallback } from 'react';

export function useItemExpansion() {
    const expandedItems = useFacetStore((s) => s.expandedItems);

    const setExpandedItems = useFacetStore((s) => s.setExpandedItems);

    const handleExpandItem = useCallback(
        (item: FacetTreeItem) => {
            const path = item.index as string;
            setExpandedItems([...expandedItems, path]);
        },
        [expandedItems, setExpandedItems],
    );

    const handleCollapseItem = useCallback(
        (item: FacetTreeItem) => {
            const path = item.index as string;
            setExpandedItems(expandedItems.filter((p) => p !== path));
        },
        [expandedItems, setExpandedItems],
    );

    return {
        handleExpandItem,
        handleCollapseItem,
    };
}
