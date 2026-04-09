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
