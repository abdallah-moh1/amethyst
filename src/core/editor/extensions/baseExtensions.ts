// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { EditorView } from '@codemirror/view';
import { history, historyKeymap } from '@codemirror/commands';

import { drawSelection, dropCursor, keymap } from '@codemirror/view';

import { searchKeymap } from '@codemirror/search';

import { bracketMatching, foldGutter } from '@codemirror/language';

import {
    autocompletion,
    completionKeymap,
    closeBrackets,
    closeBracketsKeymap,
} from '@codemirror/autocomplete';

import { defaultKeymap, indentWithTab } from '@codemirror/commands';

export const baseExtensions = [
    history(),
    drawSelection(),
    dropCursor(),
    foldGutter(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...searchKeymap,
        ...completionKeymap,
        ...closeBracketsKeymap,
        indentWithTab,
    ]),
    EditorView.lineWrapping,
];
