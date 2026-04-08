// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { EditorState } from '@codemirror/state';
import { EditorView, type ViewUpdate } from '@codemirror/view';
import type { CreateEditorOptions } from '../../../types/editor.type';
import { baseExtensions } from './extensions/baseExtensions';
import { markdownExtensions } from './extensions/markdownExtensions';
import { placeholderExtension } from './extensions/placeholder';
import { syntaxTheme } from './extensions/syntaxTheme';
import { editorTheme } from './extensions/editorTheme';

export function createEditor({ parent, doc, onChange, placeholder }: CreateEditorOptions) {
    const state = EditorState.create({
        doc,
        extensions: [
            ...baseExtensions,
            ...markdownExtensions,
            ...placeholderExtension(placeholder),
            syntaxTheme,
            editorTheme,
            EditorView.updateListener.of((update: ViewUpdate) => {
                if (!update.docChanged) return;
                onChange?.(update.state.doc.toString());
            }),
        ],
    });

    return new EditorView({
        state,
        parent,
    });
}
