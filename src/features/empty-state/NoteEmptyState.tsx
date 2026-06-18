// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import './empty-state.css';
import GrayScaleLogoAnimation from '@/shared/assets/GrayScaleLogoAnimated.svg';

export function NoteEmptyState() {
    return (
        <div className="note-empty-state">
            <img src={GrayScaleLogoAnimation} />
            <section>
                <h2>No note selected</h2>
                <p>Todo: Add quick actions here</p>
            </section>
        </div>
    );
}
