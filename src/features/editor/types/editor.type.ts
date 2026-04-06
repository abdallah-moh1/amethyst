import type { RefObject } from 'react';
import type { EditorView } from '@codemirror/view';

export type EditorProps = {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    show?: boolean;
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

export type UpdateEditorOptions = {
    view: EditorView;
    value: string;
};
