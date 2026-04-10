import { NotebookMetadata, NoteMetadata } from '@shared/types/config.type';
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

    addNoteToTree: (note: NoteMetadata) => void;
    removeNoteFromTree: (noteId: string) => void;
    updateNoteInTree: (note: NoteMetadata) => void;

    addNotebookToTree: (notebook: NotebookMetadata) => void;
    removeNotebookFromTree: (notebookPath: string) => void;
    updateNotebookInTree: (oldPath: string, notebook: NotebookMetadata) => void;
};
