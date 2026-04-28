// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Settings } from '@shared/types/settings.type';

export class SettingsClient {
    static get(key: keyof Settings): Promise<Settings[keyof Settings]> {
        return window.amethyst.settings.get(key);
    }

    static set<K extends keyof Settings>(key: K, value: Settings[K]): Promise<void> {
        return window.amethyst.settings.set(key, value);
    }

    static reset(): Promise<void> {
        return window.amethyst.settings.reset();
    }

    static getAll(): Promise<Settings> {
        return window.amethyst.settings.getAll();
    }
}
