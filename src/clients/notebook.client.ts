// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNotebook, ParentPath } from '@shared/types/facet.type';

export const createNotebook = (parentPath: ParentPath, name: string): Promise<FacetNotebook> =>
    window.amethyst.notebooks.create(parentPath, name);

export const renameNotebook = (path: string, newName: string): Promise<FacetNotebook> =>
    window.amethyst.notebooks.rename(path, newName);

export const moveNotebook = (path: string, newParentPath: ParentPath): Promise<FacetNotebook> =>
    window.amethyst.notebooks.move(path, newParentPath);

export const deleteNotebook = (path: string): Promise<void> =>
    window.amethyst.notebooks.delete(path);
