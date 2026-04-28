// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useNoteActions } from '@/features/notes';
import { FacetTreeItem } from '@/shared/types/tree.type';
import { useCallback } from 'react';

export function useItemPrimaryAction() {
    const noteActions = useNoteActions();

    const handlePrimaryAction = useCallback(
        async (item: FacetTreeItem) => {
            const data = item.data;
            if (!data) return;
            if (data.type === 'note') {
                noteActions.open({ id: data.node.id });
            }
        },
        [noteActions],
    );

    return {
        handlePrimaryAction,
    };
}
