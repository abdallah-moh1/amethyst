import { useMemo } from 'react';
import { buildFacetTree, ROOT_ID } from '../utils/treeAdapter';
import { useFacetStore, useInteractionStore } from '@/store';
import { GHOST_INDEX } from '../FacetTree';

export function useItems() {
    const notesMap = useFacetStore((s) => s.notes);
    const notebooksMap = useFacetStore((s) => s.notebooks);

    const ghost = useInteractionStore((s) => s.ghost);

    const baseItems = useMemo(
        () => buildFacetTree(Array.from(notesMap.values()), Array.from(notebooksMap.values())),
        [notesMap, notebooksMap],
    );

    // Inject ghost into the tree if one exists
    const items = useMemo(() => {
        if (!ghost) return baseItems;

        const parentIndex = ghost.parentPath ?? ROOT_ID;
        const injected = { ...baseItems };

        // Clone the parent so we don't mutate
        injected[parentIndex] = {
            ...injected[parentIndex],
            children: [...(injected[parentIndex]?.children ?? []), GHOST_INDEX],
        };

        injected[GHOST_INDEX] = {
            index: GHOST_INDEX,
            isFolder: ghost.type === 'notebook',
            children: [],
            data: null, // RCT will render it as '' via getItemTitle
        };

        return injected;
    }, [baseItems, ghost]);

    return { items };
}
