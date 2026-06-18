// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { GeodesActionBtns } from './components/GeodesActionBtns';
import { GeodesEmptyState } from './components/GeodesEmptyState';

import './geodes-manager-content.css';

export function GeodesManagerContent() {
    return (
        <div className="geodes-manager-content">
            <div className="geodes-panel">
                <p className="panel-title" data-tauri-drag-region>
                    My Geodes
                </p>
                <GeodesEmptyState />
            </div>
            <GeodesActionBtns />
        </div>
    );
}
