// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FilePlus, FolderPlus } from 'lucide-react';
import { FacetTree, GHOST_INDEX } from '../tree/FacetTree';
import { useInteractionStore } from '@/store';

function getParentRelativePath(path: string): string | null {
    const parts = path.split('/');
    if (parts.length <= 1) return null;

    parts.pop();

    return parts.join('/');
}

export function NotebooksSection() {
    const setGhost = useInteractionStore((s) => s.setGhost);
    const selectedItem = useInteractionStore((s) => s.selectedItem);

    function handleAddNote() {
        let parentPath: string | null = '';
        if (!selectedItem) parentPath = null;
        else if (selectedItem.type === 'notebook') parentPath = selectedItem.path;
        else if (selectedItem.type === 'note')
            parentPath = getParentRelativePath(selectedItem.path);

        setGhost({
            index: GHOST_INDEX,
            type: 'note',
            parentPath,
        });
    }

    function handleAddNotebook() {
        let parentPath: string | null = '';
        if (!selectedItem) parentPath = null;
        else if (selectedItem.type === 'notebook') parentPath = selectedItem.path;
        else if (selectedItem.type === 'note')
            parentPath = getParentRelativePath(selectedItem.path);

        setGhost({
            index: GHOST_INDEX,
            type: 'notebook',
            parentPath,
        });
    }

    return (
        <div className="notebooks-section">
            <div className="section-header">
                <p>Notebooks</p>
                <div className="action-btns">
                    <button onClick={handleAddNote}>
                        <FilePlus width={16} />
                    </button>
                    <button onClick={handleAddNotebook}>
                        <FolderPlus width={16} />
                    </button>
                </div>
            </div>
            <div className="section-tree">
                <FacetTree />
            </div>
        </div>
    );
}
