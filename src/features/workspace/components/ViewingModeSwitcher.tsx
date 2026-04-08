// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Eye, SquarePen, SquareSplitHorizontal } from 'lucide-react';
import { ViewModeSwitcherBtn } from './ViewModeSwitcherBtn';

export function ViewingModeSwitcher() {
    return (
        <div className="viewing-mode-switcher">
            <ViewModeSwitcherBtn mode="editor" Icon={SquarePen} />
            <ViewModeSwitcherBtn mode="preview" Icon={Eye} />
            <ViewModeSwitcherBtn mode="split-view" Icon={SquareSplitHorizontal} />
        </div>
    );
}
