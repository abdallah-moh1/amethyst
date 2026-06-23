// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { CurrentGeodeInfo } from './components/CurrentGeodeInfo';
import { NotebooksSection } from './components/NotebooksSection';

import './left-panel.css';

export function LeftPanel() {
    return (
        <div className="left-panel">
            <NotebooksSection />
            <CurrentGeodeInfo />
        </div>
    );
}
