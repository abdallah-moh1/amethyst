// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

export const validateFileName = (name: string): { isValid: boolean; error?: string } => {
    const illegalChars = /[\\/:*?"<>|]/;
    if (illegalChars.test(name)) {
        return {
            isValid: false,
            error: 'Illegal characters: \\ / : * ? " < > |',
        };
    }
    return { isValid: true };
};
