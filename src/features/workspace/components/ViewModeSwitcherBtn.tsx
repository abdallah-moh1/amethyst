// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useUIStore } from '@/store';
import { ViewMode } from '@/store/ui.store';
import { LucideProps } from 'lucide-react';

type ViewModeSwitcherBtnProps = {
    mode: ViewMode;
    width?: number;
    Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
};

export function ViewModeSwitcherBtn({ mode, Icon, width }: ViewModeSwitcherBtnProps) {
    const viewMode = useUIStore((state) => state.viewMode);
    const setViewMode = useUIStore((state) => state.setViewMode);
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
