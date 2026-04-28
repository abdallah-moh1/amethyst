// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useEffect, useRef } from 'react';
import { EditorProps } from '@/shared/types/editor.type';
import { useCodeMirror } from '../../shared/hooks/useCodeMirror';
import { useWorkspaceStore } from '@/store';

import './editor.css';

export function NoteEditor({ onChange, placeholder }: EditorProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const noteContent = useWorkspaceStore((state) => state.noteContent);
    const currentNoteId = useWorkspaceStore((state) => state.currentNoteId);

    const { resetState } = useCodeMirror({
        containerRef,
        value: noteContent,
        onChange,
        placeholder,
    });

    useEffect(() => {
        resetState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentNoteId]);

    return <div className="editor-wrapper" ref={containerRef} />;
}
