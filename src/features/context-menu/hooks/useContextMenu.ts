// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useState } from 'react';

export type ContextMenuItemVariant = 'default' | 'destructive';

export type ContextMenuItem = {
    label?: string;
    action?: () => void;
    disabled?: boolean;
    separator?: boolean;
    shortcut?: string;
    variant?: ContextMenuItemVariant;
};

export type ContextMenuState = {
    x: number;
    y: number;
    items: ContextMenuItem[];
} | null;

export function useContextMenu() {
    const [menu, setMenu] = useState<ContextMenuState>(null);

    const open = (e: React.MouseEvent, items: ContextMenuItem[]) => {
        e.preventDefault();

        const menuWidth = 200;
        const menuHeight = items.length * 34;

        let x = e.clientX;
        let y = e.clientY;

        if (x + menuWidth > window.innerWidth) x -= menuWidth;
        if (y + menuHeight > window.innerHeight) y -= menuHeight;

        setMenu({ x, y, items });
    };

    const close = () => setMenu(null);

    return { menu, open, close };
}