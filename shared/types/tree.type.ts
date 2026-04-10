import type { TreeItem, TreeItemIndex } from 'react-complex-tree';

export type NotebookNode = {
    type: 'notebook';
    name: string;
    path: string;
    children: TreeNode[];
};

export type NoteNode = {
    type: 'note';
    name: string;
    path: string;
    id: string;
};

export type TreeNode = NotebookNode | NoteNode;

export type PendingCreation = { type: 'notebook'; parentPath: string | null; } | { type: 'note'; parentPath: string | null; } | null;

export type TreeItemData =
    | { kind: 'notebook'; node: NotebookNode; }
    | { kind: 'note'; node: NoteNode; };

export type RCTItem = TreeItem<TreeItemData>;
export type RCTItems = Record<TreeItemIndex, RCTItem>;
