// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useRef } from 'react';
import { useWorkspaceStore } from '@/store';

import 'katex/dist/katex.min.css';
import './preview.css';
import { MarkdownPreview } from '@/core/markdown';

export function NotePreview() {
    const previewRef = useRef<HTMLDivElement | null>(null);
    const noteContent = useWorkspaceStore((state) => state.noteContent);
    const setNoteContent = useWorkspaceStore((state) => state.setNoteContent);

    return (
        <div className="preview" ref={previewRef}>
            <div className="preview-inner">
                <MarkdownPreview
                    content={noteContent}
                    onCheckboxChecked={({ offset, checked }) => {
                        const before = noteContent.slice(0, offset);
                        const after = noteContent.slice(offset);
                        const updated = after.replace(/^- \[( |x)\]/, checked ? '- [ ]' : '- [x]');
                        setNoteContent(before + updated);
                    }}
                />
            </div>
        </div>
    );
}
