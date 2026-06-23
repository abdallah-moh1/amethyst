// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import '../styles/geodes-action-btns.css';

export function GeodesActionBtns() {
    return (
        <div className="geodes-manager-actions">
            <button
                className="create-geode"
                onClick={() => {
                    console.log('Created');
                }}
            >
                Create a Geode
            </button>
            <button className="open-folder">Open folder as a Geode</button>
        </div>
    );
}
