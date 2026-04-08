// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { LucideProps } from 'lucide-react';

export type ViewModeSwitcherBtnProps = {
    mode: ViewingMode;
    width?: number;
    Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
};

export type ViewingMode = 'editor' | 'preview' | 'split-view';

export type SyncedScroll = {
    source: 'editor' | 'preview' | null;
    percentage: number;
};
