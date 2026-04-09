import { TreeNode } from '@shared/types/tree.type';

export type ExplorerStore = {
    tree: TreeNode[];
    expandedNotebooks: string[];
    selectedPath: string | null;
    isLoading: boolean;
    error: string | null;

    setTree: (tree: TreeNode[]) => void;
    setSelectedPath: (path: string | null) => void;
    setExpandedNotebooks: (notebooks: string[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};
