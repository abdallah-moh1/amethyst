// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { Settings } from '../../shared/types/settings.type.js';


export class SettingsService {
    settings: Settings;
    settingsFile: string;

    static defaultSettings: Settings = {
        theme: {
            id: 'amethyst-dark',
            type: 'built-in',
        },
        autoSave: true,
    };

    constructor(file: string) {
        this.settingsFile = file;

        if (!existsSync(file)) {
            this.settings = SettingsService.defaultSettings;
            return;
        }
        this.settings = this.readSettingsFile();
    }

    readSettingsFile(): Settings {
        return JSON.parse(readFileSync(this.settingsFile, 'utf-8')) as Settings;
    }

    writeSettingsFile(data: Settings) {
        writeFileSync(this.settingsFile, JSON.stringify(data, null, 2), 'utf-8');
    }

    getSetting<K extends keyof Settings>(key: K): Settings[K] {
        return this.settings[key];
    }

    setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
        this.settings[key] = value;
        // writeFileSync(settingsFile, JSON.stringify(settings));
    }

    setSettings(newSettings: Settings) {
        this.settings = newSettings;
        // writeFileSync(settingsFile, JSON.stringify(settings));
    }

    getAllSettings(): Settings {
        return this.settings;
    }

    resetSettings() {
        this.setSettings(SettingsService.defaultSettings);
    }

}