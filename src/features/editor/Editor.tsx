// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useRef } from 'react';
import { EditorProps } from '@/types/editor.type';
import { useCodeMirror } from './hooks/useCodeMirror';

import './codemirror/cm-editor.css';
import './editor.css';

export function Editor({ value = '', onChange, placeholder }: EditorProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useCodeMirror({
        containerRef,
        value,
        onChange,
        placeholder,
    });

    return <div className="editor-wrapper" ref={containerRef} />;
}
