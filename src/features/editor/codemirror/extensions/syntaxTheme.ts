// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const markdownHighlightStyle = HighlightStyle.define([
    // Headings
    {
        tag: tags.heading1,
        fontSize: '1.9em',
        fontWeight: '800',
        color: 'var(--editor-markdown-heading-1)',
    },
    {
        tag: tags.heading2,
        fontSize: '1.6em',
        fontWeight: '750',
        color: 'var(--editor-markdown-heading-2)',
    },
    {
        tag: tags.heading3,
        fontSize: '1.35em',
        fontWeight: '700',
        color: 'var(--editor-markdown-heading-3)',
    },
    {
        tag: tags.heading4,
        fontSize: '1.2em',
        fontWeight: '700',
        color: 'var(--editor-markdown-heading-4)',
    },
    {
        tag: tags.heading5,
        fontSize: '1.1em',
        fontWeight: '700',
        color: 'var(--editor-markdown-heading-5)',
    },
    {
        tag: tags.heading6,
        fontSize: '1em',
        fontWeight: '700',
        color: 'var(--editor-markdown-heading-6)',
    },
    { tag: tags.processingInstruction, color: 'var(--editor-ui-text-muted)' },
    // Markdown syntax
    { tag: tags.emphasis, fontStyle: 'italic', color: 'var(--editor-markdown-italic)' },
    { tag: tags.strong, fontWeight: 'bold', color: 'var(--editor-markdown-bold)' },
    { tag: tags.link, color: 'var(--editor-markdown-link)' },
    { tag: tags.quote, color: 'var(--editor-markdown-quote)' },
    {
        tag: tags.monospace,
        fontFamily: 'ui-monospace, monospace',
        color: 'var(--editor-markdown-inline-code-text)',
    },
    { tag: tags.contentSeparator, color: 'var(--editor-ui-text-muted)' },
    { tag: tags.strikethrough, textDecoration: 'line-through' },
    // Code syntax
    { tag: tags.keyword, color: 'var(--editor-syntax-keyword)' },
    { tag: tags.string, color: 'var(--editor-syntax-string)' },
    { tag: tags.comment, color: 'var(--editor-syntax-comment)', fontStyle: 'italic' },
    { tag: tags.number, color: 'var(--editor-syntax-number)' },
    { tag: tags.variableName, color: 'var(--editor-syntax-variable)' },
    { tag: tags.typeName, color: 'var(--editor-syntax-type)' },
    { tag: tags.function(tags.variableName), color: 'var(--editor-syntax-function)' },
    { tag: tags.operator, color: 'var(--editor-syntax-operator)' },
]);

export const syntaxTheme = syntaxHighlighting(markdownHighlightStyle);
