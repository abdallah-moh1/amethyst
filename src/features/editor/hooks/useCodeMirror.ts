import { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { createEditor } from "../codemirror/createEditor";
import { updateEditor } from "../codemirror/updateEditor";
import type { UseCodeMirrorOptions } from "../types/editor.type";
import { attachScrollbarVisibility } from "@/utils/attachScrollbarVisibility";

export function useCodeMirror({
    containerRef,
    value,
    onChange,
    placeholder
}: UseCodeMirrorOptions) {
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        if (viewRef.current) return;

        const view = createEditor({
            parent: container,
            doc: value,
            onChange,
            placeholder
        });

        viewRef.current = view;
        const cleanupScrollbar = attachScrollbarVisibility(view.scrollDOM);

        return () => {
            view.destroy();
            viewRef.current = null;
            cleanupScrollbar();
        };
    }, [containerRef]);

    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;

        updateEditor({
            view,
            value,
        });
    }, [value]);
}