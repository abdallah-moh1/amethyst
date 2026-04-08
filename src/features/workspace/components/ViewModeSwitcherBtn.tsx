// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useWorkspaceStore } from '@/store';
import { ViewModeSwitcherBtnProps } from '../../../types/workspace.type';

export function ViewModeSwitcherBtn({ mode, Icon, width }: ViewModeSwitcherBtnProps) {
    const viewMode = useWorkspaceStore((state) => state.viewMode);
    const setViewMode = useWorkspaceStore((state) => state.setViewMode);
    return (
        <div
            className={`switcher-btn ${viewMode === mode ? 'active' : ''}`}
            onClick={() => {
                setViewMode(mode);
            }}
        >
            <Icon width={width ?? 20} />
        </div>
    );
}
