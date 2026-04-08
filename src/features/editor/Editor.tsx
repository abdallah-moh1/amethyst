// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useEffect, useRef } from 'react';
import { EditorProps } from '@/types/editor.type';
import { useCodeMirror } from './hooks/useCodeMirror';
import { useWorkspaceStore } from '@/store';
import { useSyncedScroll } from '@/hooks/useSyncedScroll';

import './codemirror/cm-editor.css';
import './editor.css';

export function Editor({ value = '', onChange, placeholder }: EditorProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const source = useWorkspaceStore((state) => state.syncedScroll.source);
    const percentage = useWorkspaceStore((state) => state.syncedScroll.percentage);
    const setSyncedScroll = useWorkspaceStore((state) => state.setSyncedScroll);
    const { handleScroll, applyScroll } = useSyncedScroll(setSyncedScroll);

    const onScroll = () => {
        if (!containerRef.current || source !== null) return;
        handleScroll(containerRef.current, 'editor');
    };

    useEffect(() => {
        if (source === 'preview' && containerRef.current) {
            applyScroll(containerRef.current, percentage);
            setSyncedScroll({ source: null, percentage });
        }
    }, [source, percentage]);

    useCodeMirror({
        containerRef,
        value,
        onChange,
        placeholder,
    });

    return <div className="editor-wrapper" ref={containerRef} onScroll={onScroll} />;
}
