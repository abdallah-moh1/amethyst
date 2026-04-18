// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { commands, FacetCommands } from '@/features/commands';
import { FacetTreeItem } from '@/types/tree.type';
import { useCallback } from 'react';

export function useItemPrimaryAction() {
    const handlePrimaryAction = useCallback(
        async (item: FacetTreeItem) => {
            // if (!) return;
            const data = item.data;
            if (!data) return;
            if (data.type === 'note') {
                commands.execute(FacetCommands.OPEN_NOTE, data.node.id);
            }
        },
        [],
    );
    return {
        handlePrimaryAction,
    };
}
