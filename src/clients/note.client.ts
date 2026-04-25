// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, ParentPath } from '@shared/types/facet.type';

export const openNote = (id: string) => window.amethyst.notes.open(id);
export const saveNote = (id: string, content: string) => window.amethyst.notes.save(id, content);
export const createNote = (parentPath: ParentPath, name: string) =>
    window.amethyst.notes.create(parentPath, name);
export const renameNote = (id: string, newName: string): Promise<FacetNote> =>
    window.amethyst.notes.rename(id, newName);
export const moveNote = (id: string, newParentPath: ParentPath): Promise<FacetNote> =>
    window.amethyst.notes.move(id, newParentPath);
export const deleteNote = (id: string) => window.amethyst.notes.delete(id);
