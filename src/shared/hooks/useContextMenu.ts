// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useInteractionStore } from '@/store';
import { useCallback } from 'react';
import { ContextMenuItem } from '../types/context-menu.type';

export function useContextMenu() {
    const menu = useInteractionStore((s) => s.contextMenu);
    const setMenu = useInteractionStore((s) => s.setContextMenu);
    const open = useCallback(
        (e: React.MouseEvent, items: ContextMenuItem[]) => {
            e.preventDefault();
            e.stopPropagation();

            const menuWidth = 200;
            const menuHeight = items.length * 34;

            let x = e.clientX;
            let y = e.clientY;

            if (x + menuWidth > window.innerWidth) x -= menuWidth;
            if (y + menuHeight > window.innerHeight) y -= menuHeight;

            setMenu({ x, y, items });
        },
        [setMenu],
    );

    const close = useCallback(() => setMenu(null), [setMenu]);

    return { menu, open, close };
}
