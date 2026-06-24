// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { platform } from '@tauri-apps/plugin-os';

import './right-panel.css';

const isMacOS = platform() === 'macos';

export function RightPanel() {
    return (
        <div className={`right-panel ${!isMacOS ? 'right-panel-non-macos-overlay' : ''}`}>
            Test Code
        </div>
    );
}
