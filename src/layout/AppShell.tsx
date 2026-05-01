// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ToastNotifications } from '@/features/toast-notifications';
import { WorkspacePanels } from './WorkspacePanels';
import { ContextMenu } from '@/features/context-menu';
import { useEffect } from 'react';
import { eventToShortcut } from '@/shared/utils/shortcut';
import { useInteractionStore } from '@/store';
import { commands } from '@/core/commands';

export function AppShell() {
    const addToast = useInteractionStore((s) => s.addToast);

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            commands.executeShortcut(eventToShortcut(e)).then((result) => {
                if (result.success) return;

                addToast({
                    id: crypto.randomUUID(),
                    message: result.message,
                    duration: 4000,
                    type: 'error',
                });
            });
        }

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <main className="app-shell">
            <WorkspacePanels />
            <ToastNotifications />
            <ContextMenu />
        </main>
    );
}
