// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands, FacetCommands } from '@/features/commands';
import { useInteractionStore } from '@/store';
import { FacetTreeItem } from '@/types/tree.type';
import { useCallback } from 'react';

export function useItemPrimaryAction() {
    const addToast = useInteractionStore(s => s.addToast);

    const handlePrimaryAction = useCallback(async (item: FacetTreeItem) => {
        // if (!) return;
        const data = item.data;
        if (!data) return;
        if (data.type === 'note') {
            const result = await commands.execute(FacetCommands.OPEN_NOTE, data.node.id);
            if (result.success) return;
            addToast({
                id: Date.now().toString(),
                message: result.message,
                duration: 4000,
                type: 'error'
            });
        }
    }, [addToast]);
    return {
        handlePrimaryAction,
    };
}
