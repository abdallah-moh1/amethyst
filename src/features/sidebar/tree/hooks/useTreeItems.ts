import { useExplorerStore } from '@/store';
import { toRCTItems } from '../utils/treeAdapter';

export const GHOST_ID = '__NOTE_OR_NOTEBOOK_GHOST_ID__';

export function useTreeItems() {
    const tree = useExplorerStore((s) => s.tree);
    const pendingCreation = useExplorerStore((s) => s.pendingCreation);

    const base = toRCTItems(tree);

    if (!pendingCreation) return base;

    const parentIndex = pendingCreation.parentPath ?? 'root';
    const parent = base[parentIndex];

    if (parent) {
        base[parentIndex] = {
            ...parent,
            children: [...(parent.children ?? []), GHOST_ID],
        };
    }

    if (pendingCreation.type === 'note') {
        base[GHOST_ID] = {
            index: GHOST_ID,
            isFolder: false,
            children: [],
            data: {
                kind: 'note',
                node: {
                    type: 'note',
                    name: '',
                    path: '',
                    id: GHOST_ID,
                },
            },
        };
    } else if (pendingCreation.type === 'notebook') {
        base[GHOST_ID] = {
            index: GHOST_ID,
            isFolder: true,
            children: [],
            data: {
                kind: 'notebook',
                node: {
                    type: 'notebook',
                    name: '',
                    path: '',
                    children: [],
                },
            },
        };
    }

    return base;
}
