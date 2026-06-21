// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ToastNotifications } from '@/features/toast-notifications';
// import { RightPanel } from '@/features/right-panel';
import { Sidebar } from '@/features/sidebar';
import { WorkspaceView } from '@/features/workspace';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { ContextMenu } from '@/features/context-menu';
import { useEffect } from 'react';
import { eventToShortcut } from '@/shared/utils/shortcut';
import { useInteractionStore } from '@/store';
import { commands } from '@/core/commands';

import './styles/main-app.css';

export function MainApp() {
    const addToast = useInteractionStore((s) => s.addToast);

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            const target = e.target as HTMLElement;

            if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement ||
                target.isContentEditable
            ) {
                return;
            }

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
    }, [addToast]);

    return (
        <main className="app-shell">
            <WorkspacePanels />
            <ToastNotifications />
            <ContextMenu />
        </main>
    );
}

function WorkspacePanels() {
    return (
        <Group className="panel-group">
            <Panel
                className="panel"
                collapsible={false}
                defaultSize={240}
                minSize={200}
                collapsedSize={40}
                groupResizeBehavior="preserve-pixel-size"
            >
                <Sidebar />
            </Panel>
            <Separator className="panel-separator" />

            <Panel className="panel" minSize={300}>
                <WorkspaceView />
            </Panel>
            {/* <Separator className="panel-separator" />

            <Panel
                className="panel"
                collapsible
                defaultSize={0}
                minSize={100}
                collapsedSize={0}
                groupResizeBehavior="preserve-pixel-size"
            >
                <RightPanel />
            </Panel> */}
        </Group>
    );
}
