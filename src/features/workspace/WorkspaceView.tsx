// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Editor } from '../editor';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { Preview } from '../preview';

import './workspace-view.css';
import { useUIStore, useWorkspaceStore } from '@/store';
import { Group, Panel, PanelImperativeHandle, Separator } from 'react-resizable-panels';
import { useEffect, useRef } from 'react';

export function WorkspaceView() {
    const noteContent = useWorkspaceStore((state) => state.noteContent);
    const setNoteContent = useWorkspaceStore((state) => state.setNoteContent);
    const viewMode = useUIStore((state) => state.viewMode);

    const editorPanelRef = useRef<PanelImperativeHandle | null>(null);
    const previewPanelRef = useRef<PanelImperativeHandle | null>(null);

    useEffect(() => {
        switch (viewMode) {
            case 'editor':
                editorPanelRef.current?.expand();
                previewPanelRef.current?.collapse();

                break;
            case 'preview':
                previewPanelRef.current?.expand();
                editorPanelRef.current?.collapse();
                break;
            case 'split-view':
                previewPanelRef.current?.expand();
                editorPanelRef.current?.expand();
                previewPanelRef.current?.resize('50%');
                editorPanelRef.current?.resize('50%');
                break;
        }
    }, [viewMode]);

    return (
        <div className="workspace-view">
            <WorkspaceToolbar />
            <Group>
                <Panel
                    collapsible
                    defaultSize="50%"
                    collapsedSize={0}
                    panelRef={editorPanelRef}
                    className="panel"
                >
                    <Editor
                        value={noteContent}
                        onChange={setNoteContent}
                        placeholder="Get Creative..."
                    />
                </Panel>

                <Separator
                    className="panel-separator"
                    disabled={viewMode !== 'split-view'}
                    hidden={viewMode !== 'split-view'}
                />

                <Panel
                    collapsible
                    defaultSize="50%"
                    collapsedSize={0}
                    panelRef={previewPanelRef}
                    className="panel"
                >
                    <Preview content={noteContent} />
                </Panel>
            </Group>
        </div>
    );
}
