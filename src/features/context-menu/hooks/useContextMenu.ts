import { useState } from "react";

export type ContextMenuItem = {
    label?: string;
    action?: () => void;
    disabled?: boolean;
    separator?: boolean;
    shortcut?: string;
};

export type ContextMenuState = {
    x: number;
    y: number;
    items: ContextMenuItem[];
} | null;

export function useContextMenu() {
    const [menu, setMenu] = useState<ContextMenuState>(null);

    const open = (
        e: React.MouseEvent,
        items: ContextMenuItem[]
    ) => {
        e.preventDefault();

        const menuWidth = 200;
        const menuHeight = items.length * 34;

        let x = e.clientX;
        let y = e.clientY;

        // prevent overflow
        if (x + menuWidth > window.innerWidth) {
            x -= menuWidth;
        }

        if (y + menuHeight > window.innerHeight) {
            y -= menuHeight;
        }

        setMenu({ x, y, items });
    };

    const close = () => setMenu(null);

    return { menu, open, close };
}