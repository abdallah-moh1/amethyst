import { openNote } from '@/clients/note.client';
import { setLastOpenedNote } from '@/clients/workspace.client';
import { useWorkspaceStore } from '@/store';
import { TreeItemData } from '@shared/types/tree.type';
import { useCallback } from 'react';
import { TreeItem } from 'react-complex-tree';
import { GHOST_ID } from './useTreeItems';

export function useTreeAction() {
    const setNoteContent = useWorkspaceStore((s) => s.setNoteContent);
    const setOpenedNoteId = useWorkspaceStore((s) => s.setOpenedNoteId);

    const handlePrimaryAction = useCallback(
        (item: TreeItem<TreeItemData>) => {
            if (item.index === GHOST_ID) return;
            const data = item.data;
            if (data.kind !== 'note') return;

            const noteId = data.node.id;
            setOpenedNoteId(noteId);
            setLastOpenedNote(noteId);

            openNote(noteId).then(({ content }) => {
                setNoteContent(content);
            });
        },
        [setOpenedNoteId, setNoteContent],
    );

    return { handlePrimaryAction };
}
