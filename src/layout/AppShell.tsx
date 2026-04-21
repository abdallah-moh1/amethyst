// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import {
    ToastMessage,
    ToastNotifications,
} from '@/features/toast-notifications/ToastNotifications';
import { WorkspacePanels } from './WorkspacePanels';
import { useEffect } from 'react';
import { useInteractionStore } from '@/store';

export function AppShell() {
    const addToast = useInteractionStore((s) => s.addToast);
    useEffect(() => {
        const interval = setInterval(() => {
            const types: ToastMessage['type'][] = ['error', 'info', 'success', 'warning'];

            const type = types[Math.floor(Math.random() * types.length)];

            const newToast: ToastMessage = {
                id: crypto.randomUUID(),
                message: `Random message ${type} dddddddddddddddddddddddddddddddddddfss test long`,
                duration: 4000,
                type,
            };

            addToast(newToast);
        }, 100000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="app-shell">
            <WorkspacePanels />
            <ToastNotifications />
        </main>
    );
}
