// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { openNote } from '@/clients/note.client';
import { useWorkspaceStore } from '@/store';
import { FacetTreeItem } from '@/types/tree.type';
import { useCallback } from 'react';

export function useItemPrimaryAction() {
    const setNoteContent = useWorkspaceStore((s) => s.setNoteContent);
    const setNoteName = useWorkspaceStore((s) => s.setNoteName);
    const setCurrentNoteId = useWorkspaceStore((s) => s.setCurrentNoteId);

    const handlePrimaryAction = useCallback(
        async (item: FacetTreeItem) => {
            // if (!) return;
            const data = item.data;
            if (!data) return;
            if (data.type === 'note') {
                setNoteContent(await openNote(data.node.id));
                setNoteName(data.node.name);
                setCurrentNoteId(data.node.id);
            }
        },
        [setNoteContent, setNoteName, setCurrentNoteId],
    );
    return {
        handlePrimaryAction,
    };
}
