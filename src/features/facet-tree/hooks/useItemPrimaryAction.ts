// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetCommands } from '@/core/commands';
import { CommandRunner } from '@/core/commands';
import { FacetTreeItem } from '@/shared/types/tree.type';
import { useCallback } from 'react';

export function useItemPrimaryAction() {
    const handlePrimaryAction = useCallback(async (item: FacetTreeItem) => {
        // if (!) return;
        const data = item.data;
        if (!data) return;
        if (data.type === 'note') {
            CommandRunner.execute(FacetCommands.OPEN_NOTE, data.node.id);
        }
    }, []);
    return {
        handlePrimaryAction,
    };
}
