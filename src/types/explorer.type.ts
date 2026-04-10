import { NotebookMetadata, NoteMetadata } from '@shared/types/config.type';
import { PendingCreation, TreeNode } from '@shared/types/tree.type';

export type SelectedItem = {
    path: string | null,
    type: 'note';
    id: string;
} | {
    path: string,
    type: 'notebook';
} | null;

export type ExplorerStore = {
    tree: TreeNode[];
    expanded: string[];
    selectedItem: SelectedItem;
    isLoading: boolean;
    pendingCreation: PendingCreation;
    error: string | null;

    setTree: (tree: TreeNode[]) => void;
    setSelectedItem: (item: SelectedItem) => void;
    setExpanded: (notebooks: string[]) => void;
    setLoading: (loading: boolean) => void;
    setPendingCreation: (creation: PendingCreation) => void;
    setError: (error: string | null) => void;

    addNoteToTree: (note: NoteMetadata) => void;
    removeNoteFromTree: (noteId: string) => void;
    updateNoteInTree: (note: NoteMetadata) => void;

    addNotebookToTree: (notebook: NotebookMetadata) => void;
    removeNotebookFromTree: (notebookPath: string) => void;
    updateNotebookInTree: (oldPath: string, notebook: NotebookMetadata) => void;
};
