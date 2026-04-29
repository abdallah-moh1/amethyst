import { Shortcut } from '../types/command.type';

export function normalizeShortcut(shortcut: Shortcut) {
    const parts: string[] = [];

    if (shortcut.ctrlKey) parts.push('ctrl');
    if (shortcut.metaKey) parts.push('meta');
    if (shortcut.shiftKey) parts.push('shift');
    if (shortcut.altKey) parts.push('alt');

    parts.push(shortcut.key);
    if (parts.length === 0) return '';

    return parts
        .map((p) => p.toLowerCase())
        .sort()
        .join('+');
}

export function getDisplayableShortcut(shortcut: Shortcut) {
    const parts: string[] = [];

    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.metaKey) parts.push('Meta'); // For now later add Cmd or Win
    if (shortcut.shiftKey) parts.push('Shift');
    if (shortcut.altKey) parts.push('Alt');

    parts.push(shortcut.key);
    if (parts.length === 0) return '';

    return parts.join(' + ');
}

export function eventToShortcut(e: KeyboardEvent) {
    const shortcut: Shortcut = {
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        key: e.key,
    };

    return normalizeShortcut(shortcut);
}
