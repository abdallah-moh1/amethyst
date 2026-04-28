// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { createEditor, createState } from '@/core/editor';
import { updateEditor } from '@/core/editor';
import type { UseCodeMirrorOptions } from '@/types/editor.type';

export function useCodeMirror({
    containerRef,
    value,
    onChange,
    placeholder,
}: UseCodeMirrorOptions) {
    const viewRef = useRef<EditorView | null>(null);

    // This ref acts as a gatekeeper to prevent programmatic updates
    // from triggering the 'isDirty' logic in the store.
    const isProgrammaticUpdate = useRef(false);

    // Wrap the onChange to check our gatekeeper
    const handleDocChange = (content: string) => {
        if (isProgrammaticUpdate.current) return;
        onChange?.(content);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        if (viewRef.current) return;

        const view = createEditor({
            parent: container,
            doc: value,
            onChange: handleDocChange, // Use the wrapped version
            placeholder,
        });

        viewRef.current = view;

        return () => {
            view.destroy();
            viewRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef]);

    // Handles content sync from store to editor (e.g. undo/redo or external edits)
    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;

        // Only update if the editor content actually differs to avoid feedback loops
        if (view.state.doc.toString() !== value) {
            isProgrammaticUpdate.current = true;
            updateEditor({
                view,
                value,
            });
            isProgrammaticUpdate.current = false;
        }
    }, [value]);

    return {
        resetState() {
            const view = viewRef.current;
            if (!view) return;
            view.setState(
                createState({
                    doc: value,
                    onChange: handleDocChange, // Re-bind the wrapped version
                    placeholder,
                }),
            );
        },
    };
}
