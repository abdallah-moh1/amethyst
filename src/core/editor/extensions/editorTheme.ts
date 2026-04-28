// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { EditorView } from '@codemirror/view';

export const editorTheme = EditorView.theme({
    '&': {
        fontSize: '16px',
        color: 'var(--editor-ui-text)',
    },

    '.cm-scroller': {
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    },

    '&.cm-focused': {
        outline: 'none',
    },

    '.cm-gutters': {
        borderRight: 'none',
        backgroundColor: 'transparent',
    },

    '.cm-foldGutter .cm-gutterElement': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    '.cm-foldPlaceholder': {
        backgroundColor: 'var(--editor-ui-fold-placeholder-bg)',
        border: 'none',
        color: 'var(--editor-ui-fold-placeholder-text)',
        fontWeight: '700',
        fontSize: '16px',
        margin: '10px',
        padding: '0 4px',
    },

    '.cm-selectionBackground': {
        backgroundColor: 'var(--editor-ui-selection)',
    },

    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
        backgroundColor: 'var(--editor-ui-selection)',
    },

    '.cm-cursor': {
        borderLeft: 'none',
        width: '2px',
        backgroundColor: 'var(--editor-ui-caret)',
        borderRadius: '4px',
    },
});
