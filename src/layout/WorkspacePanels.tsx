// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { RightPanel } from '@/features/right-panel';
import { Sidebar } from '@/features/sidebar';
import { WorkspaceView } from '@/features/workspace';
import { Panel, Group } from 'react-resizable-panels';

export function WorkspacePanels() {
    return (
        <Group className="panel-group">
            <Panel
                className="panel"
                collapsible
                defaultSize={240}
                minSize={200}
                collapsedSize={40}
                groupResizeBehavior="preserve-pixel-size"
            >
                <Sidebar />
            </Panel>

            <Panel className="panel" minSize={300}>
                <WorkspaceView />
            </Panel>

            <Panel
                className="panel"
                collapsible
                defaultSize={200}
                minSize={100}
                collapsedSize={40}
                groupResizeBehavior="preserve-pixel-size"
            >
                <RightPanel />
            </Panel>
        </Group>
    );
}
