import { FacetNote, FacetNotebook } from '@shared/types/facet.type';
import { TreeItemIndex, TreeItem } from 'react-complex-tree';

export type FacetTreeItemData =
    | { type: 'note'; node: FacetNote }
    | { type: 'notebook'; node: FacetNotebook };

export type FacetTreeItem = TreeItem<FacetTreeItemData | null>;
export type FacetTree = Record<TreeItemIndex, FacetTreeItem>;
