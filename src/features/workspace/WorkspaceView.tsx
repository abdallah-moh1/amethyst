// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { NoteEditor } from '../note-editor';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { NotePreview } from '../note-preview';
import { useUIStore, useWorkspaceStore } from '@/store';
import { Group, Panel, PanelImperativeHandle, Separator } from 'react-resizable-panels';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { NoteEmptyState } from '../empty-state';

import './workspace-view.css';

export function WorkspaceView() {
    const currentNoteId = useWorkspaceStore((state) => state.currentNoteId);
    const viewMode = useUIStore((state) => state.viewMode);

    const setNoteContent = useWorkspaceStore((state) => state.setNoteContent);
    const markDirty = useWorkspaceStore((state) => state.markDirty);

    const editorPanelRef = useRef<PanelImperativeHandle | null>(null);
    const previewPanelRef = useRef<PanelImperativeHandle | null>(null);

    const onChange = useCallback(
        (value: string) => {
            setNoteContent(value);
            markDirty();
        },
        [setNoteContent, markDirty],
    );

    useLayoutEffect(() => {
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
            {currentNoteId ? (
                <>
                    <WorkspaceToolbar />
                    <Group>
                        <Panel
                            collapsible
                            defaultSize="50%"
                            collapsedSize={0}
                            panelRef={editorPanelRef}
                            className="panel"
                        >
                            <NoteEditor
                                key={currentNoteId}
                                onChange={onChange}
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
                            <NotePreview />
                        </Panel>
                    </Group>
                </>
            ) : (
                <NoteEmptyState />
            )}
        </div>
    );
}
