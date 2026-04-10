// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { openNote } from '@/clients/note.client';
import { AppShell } from '@/layout';
import { useWorkspaceStore } from '@/store';
import { useExplorerStore } from '@/store/explorer.store';
import { useEffect } from 'react';

export default function App() {
    const setTree = useExplorerStore((state) => state.setTree);
    const setExpandedNotebooks = useExplorerStore((state) => state.setExpandedNotebooks);
    const setOpenedNoteId = useWorkspaceStore((state) => state.setOpenedNoteId);
    const setNoteContent = useWorkspaceStore((state) => state.setNoteContent);

    useEffect(() => {
        window.amethyst.workspace.loadSnapshot().then(async (data) => {
            setTree(data.tree);

            if (data.workspace.lastOpenedNoteId) {
                setNoteContent((await openNote(data.workspace.lastOpenedNoteId)).content);
                setOpenedNoteId(data.workspace.lastOpenedNoteId);
            }

            setExpandedNotebooks(data.workspace.expandedNotebookPaths);
        });
    }, []);

    return <AppShell />;
}
