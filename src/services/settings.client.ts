// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Settings } from "@shared/types/settings.type";

export function getSetting(key: keyof Settings): Promise<Settings[keyof Settings]> {
    return window.amethyst.settings.get(key);
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]): Promise<void> {
    return window.amethyst.settings.set(key, value);
}

export function resetSettings(): Promise<void> {
    return window.amethyst.settings.reset();
}

export function getAllSettings(): Promise<Settings> {
    return window.amethyst.settings.getAll();
}