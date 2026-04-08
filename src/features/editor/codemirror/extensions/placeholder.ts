// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { placeholder as cmPlaceholder } from '@codemirror/view';

export function placeholderExtension(text?: string) {
    return text ? [cmPlaceholder(text)] : [];
}
