// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FilePlus, FolderPlus } from 'lucide-react';
import { FacetTree } from '../tree/FacetTree';
import { useInteractionStore } from '@/store';
import { commands, FacetCommands } from '@/features/commands';
import { ParentPath } from '@shared/types/facet.type';
import { getParentRelativePath } from '@/utils';
import { useCallback } from 'react';
import { ContextMenu, useContextMenu } from '@/features/context-menu';

export function NotebooksSection() {
    const selectedItem = useInteractionStore((s) => s.selectedItem);
    const contextMenu = useContextMenu();

    const handleAddNote = useCallback(() => {
        let parentPath: ParentPath = null;
        if (selectedItem?.type === 'notebook') parentPath = selectedItem.path;
        else if (selectedItem?.type === 'note')
            parentPath = getParentRelativePath(selectedItem.path);

        commands.execute(FacetCommands.CREATE_NOTE, parentPath);
    }, [selectedItem]);

    const handleAddNotebook = useCallback(() => {
        let parentPath: ParentPath = null;
        if (selectedItem?.type === 'notebook') parentPath = selectedItem.path;
        else if (selectedItem?.type === 'note')
            parentPath = getParentRelativePath(selectedItem.path);

        commands.execute(FacetCommands.CREATE_NOTEBOOK, parentPath);
    }, [selectedItem]);

    const handleContextMenu = useCallback(
        (e: React.MouseEvent<Element, MouseEvent>) => {
            if (e.defaultPrevented) return;
            contextMenu.open(e, [
                {
                    label: 'New Note',
                    // Replace with your actual command later
                    action: () => commands.execute(FacetCommands.CREATE_NOTE, null),
                },
                {
                    label: 'New Notebook',
                    action: () => commands.execute(FacetCommands.CREATE_NOTEBOOK, null),
                },
            ]);
        },
        [contextMenu],
    );

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
            <div className="section-tree" onContextMenu={handleContextMenu}>
                <FacetTree />
            </div>
            <ContextMenu {...contextMenu} />
        </div>
    );
}
