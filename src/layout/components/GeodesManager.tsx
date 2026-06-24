// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import '../styles/geodes-manager.css';

import { GeodesManagerContent } from '@/features/geodes-manager/GeodesManagerContent';
import { WindowControls } from './WindowControls';

export function GeodesManager() {
    return (
        <div className="geodes-manager" data-tauri-drag-region>
            <WindowControls hideToggleMaximize={true} />
            <div className="geodes-manager-titlebar" data-tauri-drag-region></div>
            <GeodesManagerContent />
        </div>
    );
}
