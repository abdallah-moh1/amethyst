import type { UpdateEditorOptions } from "../types/editor.type";

export function updateEditor({ view, value }: UpdateEditorOptions) {
    const currentValue = view.state.doc.toString();

    if (currentValue === value) return;

    view.dispatch({
        changes: {
            from: 0,
            to: currentValue.length,
            insert: value,
        },
    });
}