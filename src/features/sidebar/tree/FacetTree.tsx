import { useFacetStore } from '@/store';
import { Tree, ControlledTreeEnvironment } from 'react-complex-tree';
import { useItemSelection } from './hooks/useItemSelection';
import { useItemExpansion } from './hooks/useItemExpansion';

import './rct.css';

export function FacetTree() {
    const tree = useFacetStore((s) => s.tree);
    const expandedItems = useFacetStore((s) => s.expandedItems);

    const { selectedItems, handleSelectItems } = useItemSelection();
    const { handleExpandItem, handleCollapseItem } = useItemExpansion();

    return (
        <ControlledTreeEnvironment
            items={tree}
            getItemTitle={(item) => item.data?.node.name ?? 'Root'}
            viewState={{
                facet: {
                    expandedItems,
                    selectedItems,
                },
            }}
            onSelectItems={handleSelectItems}
            onExpandItem={handleExpandItem}
            onCollapseItem={handleCollapseItem}
        >
            <Tree treeId="facet" rootItem="root" treeLabel="Facet Tree" />
        </ControlledTreeEnvironment>
    );
}
