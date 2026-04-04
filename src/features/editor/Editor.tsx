import { useRef } from 'react';
import { EditorProps } from './types/editor.type';
import { useCodeMirror } from './hooks/useCodeMirror';

import './codemirror/cm-editor.css';

export function Editor({ value = '', onChange, placeholder }: EditorProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useCodeMirror({
        containerRef,
        value,
        onChange,
        placeholder,
    });

    return <div style={{ height: '100%' }} ref={containerRef} />;
}
