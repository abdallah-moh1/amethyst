// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { NoteNameInput } from './NoteNameInput';
import { ViewingModeSwitcher } from './ViewingModeSwitcher';

export function WorkspaceToolbar() {
    return (
        <div className="workspace-toolbar">
            <NoteNameInput />
            <ViewingModeSwitcher />
        </div>
    );
}
