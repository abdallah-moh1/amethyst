// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import { PreviewProps } from '@/types/preview.type';
import { customComponents } from './customComponents';
import rehypeHighlight from 'rehype-highlight';
import { useRef } from 'react';

import './preview.css';

export function Preview({ content }: PreviewProps) {
    const previewRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="preview" ref={previewRef}>
            <div className="preview-inner">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={customComponents}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
