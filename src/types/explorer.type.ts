import { TreeNode } from '@shared/types/tree.type';

export type ExplorerStore = {
    tree: TreeNode[];
    expandedNotebooks: Set<string>;
    selectedPath: string | null;
    isLoading: boolean;
    error: string | null;

    setTree: (tree: TreeNode[]) => void;
    toggleNotebook: (path: string) => void;
    expandNotebook: (path: string) => void;
    collapseNotebook: (path: string) => void;
    setSelectedPath: (path: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};
