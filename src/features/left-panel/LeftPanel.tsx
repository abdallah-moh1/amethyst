// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { platform } from '@tauri-apps/plugin-os';

import { CurrentGeodeInfo } from './components/CurrentGeodeInfo';
import { NotebooksSection } from './components/NotebooksSection';

import './styles/left-panel.css';

const isMacOS = platform() === 'macos';

export function LeftPanel() {
    return (
        <div className={`left-panel ${isMacOS ? 'left-panel-macos-overlay' : ''}`}>
            <NotebooksSection />
            <CurrentGeodeInfo />
        </div>
    );
}
