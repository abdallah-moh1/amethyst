// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNotebook, ParentPath } from '@shared/types/facet.type';

export class NotebookClient {
    static create(parentPath: ParentPath, name: string): Promise<FacetNotebook> {
        return window.amethyst.notebooks.create(parentPath, name);
    }

    static rename(path: string, newName: string): Promise<FacetNotebook> {
        return window.amethyst.notebooks.rename(path, newName);
    }

    static move(path: string, newParentPath: ParentPath): Promise<FacetNotebook> {
        return window.amethyst.notebooks.move(path, newParentPath);
    }

    static delete(path: string): Promise<void> {
        return window.amethyst.notebooks.delete(path);
    }
}
