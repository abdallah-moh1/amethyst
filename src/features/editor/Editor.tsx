// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useRef } from 'react';
import { EditorProps } from '@/types/editor.type';
import { useCodeMirror } from './hooks/useCodeMirror';

import './codemirror/cm-editor.css';
import './editor.css';
import { useWorkspaceStore } from '@/store';

export function Editor({ onChange, placeholder }: EditorProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const noteContent = useWorkspaceStore((state) => state.noteContent);

    useCodeMirror({
        containerRef,
        value: noteContent,
        onChange,
        placeholder,
    });

    return <div className="editor-wrapper" ref={containerRef} />;
}
