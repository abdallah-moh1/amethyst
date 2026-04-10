// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import type { RefObject } from 'react';
import type { EditorView } from '@codemirror/view';

export type EditorProps = {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};

export type UseCodeMirrorOptions = {
    containerRef: RefObject<HTMLDivElement | null>;
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};

export type CreateEditorOptions = {
    parent: HTMLDivElement;
    doc: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};

export type CreateStateOptions = {
    doc: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};

export type UpdateEditorOptions = {
    view: EditorView;
    value: string;
};
