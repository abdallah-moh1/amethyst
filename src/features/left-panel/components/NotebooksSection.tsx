// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FilePlus2, Folder } from 'lucide-react';
import { FileExplorerTree } from '@/features/file-explorer-tree';
import { useInteractionStore } from '@/store';
import { ParentPath } from '@shared/types/facet.type';
import { useCallback } from 'react';
import { useContextMenu } from '@/shared/hooks/useContextMenu';
import { NotebookCommands, useNotebookActions } from '@/features/notebooks';
import { NoteCommands, useNoteActions } from '@/features/notes';
import { commands } from '@/core/commands';

import '../styles/notebooks-section.css';

export function NotebooksSection() {
    const contextMenu = useContextMenu();

    const noteActions = useNoteActions();
    const notebookActions = useNotebookActions();

    const handleContextMenu = useCallback(
        (e: React.MouseEvent<Element, MouseEvent>) => {
            if (e.defaultPrevented) return;
            contextMenu.open(e, [
                {
                    label: 'New Note',
                    shortcut: commands.getCommandShortcut(NoteCommands.CREATE_NOTE),
                    action: () => noteActions.create({ parentPath: null }),
                },
                {
                    label: 'New Notebook',
                    shortcut: commands.getCommandShortcut(NotebookCommands.CREATE_NOTEBOOK),
                    action: () => notebookActions.create({ parentPath: null }),
                },
            ]);
        },
        [contextMenu, noteActions, notebookActions],
    );

    return (
        <div className="notebooks-section">
            <NotebooksSectionHeader />
            <div className="section-tree" onContextMenu={handleContextMenu}>
                <FileExplorerTree />
            </div>
        </div>
    );
}

function NotebooksSectionHeader() {
    const selectedItem = useInteractionStore((s) => s.selectedItem);
    const getResolvedParentPath = useInteractionStore((s) => s.getResolvedParentPath);

    const noteActions = useNoteActions();
    const notebookActions = useNotebookActions();

    const handleAddNote = useCallback(() => {
        const parentPath: ParentPath = selectedItem ? getResolvedParentPath() : null;

        noteActions.create({ parentPath });
    }, [selectedItem, noteActions, getResolvedParentPath]);

    const handleAddNotebook = useCallback(() => {
        const parentPath: ParentPath = selectedItem ? getResolvedParentPath() : null;

        notebookActions.create({ parentPath });
    }, [selectedItem, notebookActions, getResolvedParentPath]);

    return (
        <div className="section-header">
            <p>My Notebooks</p>
            <div className="action-btns">
                <button onClick={handleAddNote} title="Add Note">
                    <FilePlus2 width={17} />
                </button>
                <button onClick={handleAddNotebook} title="Add Notebook">
                    <Folder width={17} />
                </button>
            </div>
        </div>
    );
}
