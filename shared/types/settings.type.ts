// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

export interface Settings {
    theme: {
        id: string;
        type: 'built-in' | 'custom';
    };
    autoSave: boolean;
}
