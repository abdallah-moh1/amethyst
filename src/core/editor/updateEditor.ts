import { UpdateEditorOptions } from '@/shared/types/editor.type';

export function updateEditor({ view, value }: UpdateEditorOptions) {
    const current = view.state.doc.toString();
    if (current === value) return;

    let start = 0;
    let endCurrent = current.length;
    let endNew = value.length;

    // find common prefix
    while (start < endCurrent && start < endNew && current[start] === value[start]) {
        start++;
    }

    // find common suffix
    while (endCurrent > start && endNew > start && current[endCurrent - 1] === value[endNew - 1]) {
        endCurrent--;
        endNew--;
    }

    view.dispatch({
        changes: {
            from: start,
            to: endCurrent,
            insert: value.slice(start, endNew),
        },
    });
}
