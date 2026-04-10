import { ControlledTreeEnvironment, Tree, TreeItem, TreeRef } from 'react-complex-tree';

import { useCallback, useRef } from 'react';
import { displayName } from './utils/treeAdapter';
import { TreeItemData } from '@shared/types/tree.type';
import { useTreeItems } from './hooks/useTreeItems';
import { useItemSelection } from './hooks/useItemSelection';
import { useItemExpansion } from './hooks/useItemExpansion';
import { useItemRename } from './hooks/useItemRename';
import { useTreeAction } from './hooks/useTreeAction';

export function NotebooksTree() {
    const treeRef = useRef<TreeRef<TreeItemData>>(null);

    const items = useTreeItems();

    const { selectedItems, handleSelectItems } = useItemSelection(items);
    const { expandedItems, handleCollapseItem, handleExpandItem } = useItemExpansion(treeRef);
    const { handleRenameItem, handleAbortRenaming } = useItemRename();
    const { handlePrimaryAction } = useTreeAction();

    const getItemTitle = useCallback(
        (item: TreeItem<TreeItemData>) => displayName(item.data.node.name),
        [],
    );

    return (
        <ControlledTreeEnvironment<TreeItemData>
            items={items}
            getItemTitle={getItemTitle}
            viewState={{
                'notes-tree': {
                    expandedItems,
                    selectedItems,
                },
            }}
            canRename
            canDragAndDrop={false}
            onExpandItem={handleExpandItem}
            onCollapseItem={handleCollapseItem}
            onSelectItems={handleSelectItems}
            onPrimaryAction={handlePrimaryAction}
            onRenameItem={handleRenameItem}
            onAbortRenamingItem={handleAbortRenaming}
        >
            <Tree treeId="notes-tree" rootItem="root" treeLabel="Notes & Notebooks" ref={treeRef} />
        </ControlledTreeEnvironment>
    );
}
