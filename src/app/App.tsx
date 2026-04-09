// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { AppShell } from '@/layout';
import { useWorkspaceStore } from '@/store';
import { useExplorerStore } from '@/store/explorer.store';

export default function App() {
    const setTree = useExplorerStore((state) => state.setTree);
    const expandNotebook = useExplorerStore((state) => state.expandNotebook);
    const setLastOpenedNoteId = useWorkspaceStore((state) => state.setLastOpenedNoteId);

    window.amethyst.workspace.loadSnapshot().then((data) => {
        setTree(data.tree);
        setLastOpenedNoteId(data.workspace.lastOpenedNoteId);

        data.workspace.expandedNotebookPaths.forEach((folder) => {
            expandNotebook(folder);
        });
    });

    return <AppShell />;
}
