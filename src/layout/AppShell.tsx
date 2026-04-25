// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ToastNotifications } from '@/features/toast-notifications';
import { WorkspacePanels } from './WorkspacePanels';
import { ContextMenu, useContextMenu } from '@/features/context-menu';

export function AppShell() {
    const contextMenu = useContextMenu();
    return (
        <main className="app-shell">
            <WorkspacePanels />
            <ToastNotifications />
            <ContextMenu {...contextMenu} />
        </main>
    );
}
