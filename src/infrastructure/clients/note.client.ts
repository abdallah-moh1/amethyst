// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, ParentPath } from '@shared/types/facet.type';

export class NoteClient {
    static open(id: string): Promise<string> {
        return window.amethyst.notes.open(id);
    }

    static save(id: string, content: string): Promise<void> {
        return window.amethyst.notes.save(id, content);
    }

    static create(parentPath: ParentPath, name: string): Promise<FacetNote> {
        return window.amethyst.notes.create(parentPath, name);
    }

    static rename(id: string, newName: string): Promise<FacetNote> {
        return window.amethyst.notes.rename(id, newName);
    }

    static move(id: string, newParentPath: ParentPath): Promise<FacetNote> {
        return window.amethyst.notes.move(id, newParentPath);
    }

    static delete(id: string): Promise<void> {
        return window.amethyst.notes.delete(id);
    }
}
