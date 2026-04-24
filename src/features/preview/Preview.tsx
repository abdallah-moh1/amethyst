// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import { customComponents } from './customComponents';
import rehypeHighlight from 'rehype-highlight';
import { useRef } from 'react';
import { useWorkspaceStore } from '@/store';

import './preview.css';

export function Preview() {
    const previewRef = useRef<HTMLDivElement | null>(null);
    const noteContent = useWorkspaceStore((state) => state.noteContent);

    return (
        <div className="preview" ref={previewRef}>
            <div className="preview-inner">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={customComponents}
                >
                    {noteContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}
