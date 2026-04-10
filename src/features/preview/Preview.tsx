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
import { useEffect, useRef } from 'react';
import { useWorkspaceStore } from '@/store';
import { useSyncedScroll } from '@/hooks/useSyncedScroll';

import './preview.css';

export function Preview({ content }: PreviewProps) {
    const previewRef = useRef<HTMLDivElement | null>(null);
    const source = useWorkspaceStore((state) => state.syncedScroll.source);
    const percentage = useWorkspaceStore((state) => state.syncedScroll.percentage);
    const setSyncedScroll = useWorkspaceStore((state) => state.setSyncedScroll);

    const { handleScroll, applyScroll } = useSyncedScroll(setSyncedScroll);

    const onScroll = () => {
        if (!previewRef.current || source !== null) return;
        handleScroll(previewRef.current, 'preview');
    };

    useEffect(() => {
        if (source === 'editor' && previewRef.current) {
            applyScroll(previewRef.current, percentage);
            setSyncedScroll({ source: null, percentage });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source, percentage]);

    return (
        <div className="preview" ref={previewRef} onScroll={onScroll}>
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
