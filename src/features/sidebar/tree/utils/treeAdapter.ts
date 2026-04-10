// src/features/sidebar/utils/treeAdapter.ts

import { RCTItems, TreeNode } from '@shared/types/tree.type';
import { TreeItemIndex } from 'react-complex-tree';

const ROOT_INDEX: TreeItemIndex = 'root';

/**
 * Flatten the recursive TreeNode[] coming from the backend into the
 * record-of-items shape that react-complex-tree expects.
 *
 * Notebooks use their `path` as the index (unique on disk).
 * Notes use their `id` as the index (UUID, stable across renames).
 */
export function toRCTItems(nodes: TreeNode[]): RCTItems {
    const items: RCTItems = {};

    // Virtual root that react-complex-tree requires
    items[ROOT_INDEX] = {
        index: ROOT_INDEX,
        isFolder: true,
        children: topLevelIndices(nodes),
        data: {
            kind: 'notebook',
            node: { type: 'notebook', name: 'root', path: '', children: [] },
        },
    };

    function walk(node: TreeNode) {
        if (node.type === 'notebook') {
            items[node.path] = {
                index: node.path,
                isFolder: true,
                children: topLevelIndices(node.children),
                data: { kind: 'notebook', node },
            };
            node.children.forEach(walk);
        } else {
            items[node.id] = {
                index: node.id,
                isFolder: false,
                children: [],
                data: { kind: 'note', node },
            };
        }
    }

    nodes.forEach(walk);
    return items;
}

function topLevelIndices(nodes: TreeNode[]): TreeItemIndex[] {
    return nodes.map((n) => (n.type === 'notebook' ? n.path : n.id));
}

/** Strip the `.md` extension for display. */
export function displayName(name: string): string {
    return name.endsWith('.md') ? name.slice(0, -3) : name;
}
