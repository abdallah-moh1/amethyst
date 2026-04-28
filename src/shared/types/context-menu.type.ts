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
