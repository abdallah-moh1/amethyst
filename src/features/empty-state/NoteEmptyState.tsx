// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import GrayscaleLogo from '@/shared/assets/GrayscaleLogo.svg';
import './empty-state.css';

export function NoteEmptyState() {
    return (
        <div className="note-empty-state">
            <img src={GrayscaleLogo} alt="" />
            <h2>No note selected</h2>
            <p>Todo: Add quick actions here</p>
        </div>
    );
}
