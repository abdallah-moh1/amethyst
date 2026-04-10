// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { isConfigPath, isMarkdownFile, normalizeRelativePath } from '../utils/path.utils.js';

export class SafeScannerService {
    constructor(private safePath: string) { }

    async scan(): Promise<{ notes: string[]; notebooks: string[]; }> {
        const notes: string[] = [];
        const notebooks: string[] = [];

        const entries = await readdir(this.safePath, {
            recursive: true,
            withFileTypes: true,
        });

        for (const dirent of entries) {
            const fullPath = join(dirent.parentPath, dirent.name);
            const relativePath = normalizeRelativePath(relative(this.safePath, fullPath));

            if (isConfigPath(relativePath)) {
                continue;
            }

            if (dirent.isDirectory()) {
                notebooks.push(relativePath);
            } else if (dirent.isFile() && isMarkdownFile(relativePath)) {
                notes.push(relativePath);
            }
        }

        return { notes, notebooks };
    }
}
