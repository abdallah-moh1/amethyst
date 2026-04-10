import { createNote, openNote, renameNote } from "@/clients/note.client";
import { createNotebook, renameNotebook } from "@/clients/notebook.client";
import { setLastOpenedNote } from "@/clients/workspace.client";
import { useExplorerStore, useWorkspaceStore } from "@/store";
import { TreeItemData } from "@shared/types/tree.type";
import { useCallback } from "react";
import { TreeItem } from "react-complex-tree";
import { GHOST_ID } from "./useTreeItems";

export function useItemRename() {
    const pendingCreation = useExplorerStore((s) => s.pendingCreation);

    const setPendingCreation = useExplorerStore((s) => s.setPendingCreation);
    const addNoteToTree = useExplorerStore((s) => s.addNoteToTree);
    const addNotebookToTree = useExplorerStore((s) => s.addNotebookToTree);

    const setNoteContent = useWorkspaceStore((s) => s.setNoteContent);
    const setOpenedNoteId = useWorkspaceStore((s) => s.setOpenedNoteId);

    const handleRenameItem = useCallback(
        async (item: TreeItem<TreeItemData>, newName: string) => {
            const trimmed = newName.trim();

            // cancel empty
            if (!trimmed) {
                if (item.index === GHOST_ID) {
                    setPendingCreation(null);
                }
                return;
            }

            const data = item.data;

            // 🟢 GHOST CREATION
            if (item.index === GHOST_ID && pendingCreation) {
                setPendingCreation(null);

                if (pendingCreation.type === 'note') {
                    const meta = await createNote(pendingCreation.parentPath, trimmed);

                    setOpenedNoteId(meta.id);
                    setLastOpenedNote(meta.id);

                    const { content } = await openNote(meta.id);
                    setNoteContent(content);
                    addNoteToTree(meta);
                }

                if (pendingCreation.type === 'notebook') {
                    const meta = await createNotebook(pendingCreation.parentPath, trimmed);
                    addNotebookToTree(meta);
                }

                return;
            }

            // 🟡 NORMAL RENAME
            if (data.kind === 'note') {
                renameNote(data.node.id, trimmed);
            } else {
                renameNotebook(data.node.path, trimmed);
            }
        },
        [
            pendingCreation,
            setPendingCreation,
            setOpenedNoteId,
            setNoteContent,
            addNoteToTree,
            addNotebookToTree,
        ],
    );

    const handleAbortRenaming = useCallback(
        (item: TreeItem<TreeItemData>) => {
            if (item.index === GHOST_ID) {
                setPendingCreation(null);
            }
        },
        [setPendingCreation],
    );

    return {
        handleRenameItem, handleAbortRenaming
    };
}