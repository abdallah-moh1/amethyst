// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FilePlus, FolderPlus } from 'lucide-react';
import { FacetTree } from '../tree/FacetTree';
import { useInteractionStore } from '@/store';
import { commands, FacetCommands } from '@/features/commands';
import { ParentPath } from '@shared/types/facet.type';
import { getParentRelativePath } from '@/utils';

export function NotebooksSection() {
    const selectedItem = useInteractionStore((s) => s.selectedItem);

    function handleAddNote() {
        let parentPath: ParentPath = null;
        if (selectedItem?.type === 'notebook') parentPath = selectedItem.path;
        else if (selectedItem?.type === 'note')
            parentPath = getParentRelativePath(selectedItem.path);

        commands.execute(FacetCommands.CREATE_NOTE, parentPath);
    }

    function handleAddNotebook() {
        let parentPath: ParentPath = null;
        if (selectedItem?.type === 'notebook') parentPath = selectedItem.path;
        else if (selectedItem?.type === 'note')
            parentPath = getParentRelativePath(selectedItem.path);

        commands.execute(FacetCommands.CREATE_NOTEBOOK, parentPath);
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
