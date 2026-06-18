// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { GeodesManagerContent } from '@/features/geodes-manager/GeodesManagerContent';
import './geodes-manager.css';

export function GeodesManager() {
    return (
        <div className="geodes-manager" data-tauri-drag-region>
            <div className="geodes-manager-titlebar" data-tauri-drag-region></div>
            <GeodesManagerContent />
        </div>
    );
}
