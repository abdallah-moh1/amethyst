// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import type { UpdateEditorOptions } from '../../../types/editor.type';

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
