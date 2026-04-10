// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { openNote } from '@/clients/note.client';
import { loadConfigSnapshot } from '@/clients/workspace.client';
import { AppShell } from '@/layout';
import { useWorkspaceStore, useExplorerStore } from '@/store';
import { useEffect } from 'react';

export default function App() {
    const setTree = useExplorerStore((state) => state.setTree);
    const setExpandedNotebooks = useExplorerStore((state) => state.setExpandedNotebooks);
    const setOpenedNoteId = useWorkspaceStore((state) => state.setOpenedNoteId);
    const setNoteContent = useWorkspaceStore((state) => state.setNoteContent);

    useEffect(() => {
        loadConfigSnapshot().then(async (data) => {
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
