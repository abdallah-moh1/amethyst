import { useRef } from 'react';
import { EditorProps } from './types/editor.type';
import { useCodeMirror } from './hooks/useCodeMirror';

import './codemirror/cm-editor.css';
import './editor.css';

export function Editor({ value = '', show = true, onChange, placeholder }: EditorProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useCodeMirror({
        containerRef,
        value,
        onChange,
        placeholder,
    });

    return <div className={`editor-wrapper ${!show ? 'hidden' : ''}`} ref={containerRef} />;
}
