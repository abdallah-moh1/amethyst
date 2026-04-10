// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { NotebooksSection } from './components/NotebooksSection';
import './sidebar.css';
import './rct.css';

export function Sidebar() {
    return (
        <div className="sidebar">
            <NotebooksSection />
        </div>
    );
}
