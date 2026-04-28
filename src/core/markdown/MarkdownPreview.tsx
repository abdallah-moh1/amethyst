// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import { useCustomComponents } from '../../core/markdown/customComponents';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import './markdown.css';

type MarkdownPreviewProps = {
    content: string;
    onCheckboxChecked?: (props: { offset: number; checked: boolean }) => void;
};

export function MarkdownPreview({ content, onCheckboxChecked }: MarkdownPreviewProps) {
    const { customComponents } = useCustomComponents({ onCheckboxChecked });
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
            components={customComponents}
        >
            {content}
        </ReactMarkdown>
    );
}
