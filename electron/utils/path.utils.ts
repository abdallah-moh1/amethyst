// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import path from 'node:path';

export function normalizeRelativePath(path: string): string {
    return path
        .replace(/\\/g, '/') // convert \ → /
        .replace(/\/+/g, '/') // remove duplicate slashes
        .replace(/^\/+/, '') // remove leading slash
        .replace(/\/+$/, ''); // remove trailing slash
}

export function joinRelativePath(...parts: string[]): string {
    return normalizeRelativePath(parts.join('/'));
}

export function getNameFromPath(path: string): string {
    const parts = normalizeRelativePath(path).split('/');

    return parts[parts.length - 1];
}

export function getParentRelativePath(path: string): string | null {
    const parts = normalizeRelativePath(path).split('/');
    if (parts.length <= 1) return null;

    parts.pop();

    return joinRelativePath(...parts);
}

export function isMarkdownFile(path: string): boolean {
    return path.endsWith('.md');
}

export function isConfigPath(path: string): boolean {
    return path.startsWith('.config');
}
export function toAbsoluteSafePath(safePath: string, relativePath: string): string {
    return path.join(safePath, relativePath);
}
export function toRelativeSafePath(safePath: string, absolutePath: string): string {
    return normalizeRelativePath(path.relative(safePath, absolutePath));
}

export function replacePrefix(path: string, oldPath: string, newPath: string): string {
    if (path === oldPath) return newPath;
    if (path.startsWith(oldPath + '/')) {
        return newPath + path.slice(oldPath.length);
    }
    return normalizeRelativePath(path);
}
