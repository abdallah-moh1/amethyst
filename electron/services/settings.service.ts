import { app } from 'electron';
import { join } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { Settings } from '../../shared/types/settings.type.js';

const dataFolder = app.getPath('userData');
const settingsFile = join(dataFolder, 'settings.json');

let settings: Settings;

export const defaultSettings = {
    theme: {
        id: 'amethyst-dark',
        type: 'built-in',
    },
    autoSave: true
};


export function loadSettings() {
    try {
        const data = readFileSync(settingsFile, 'utf-8');
        settings = JSON.parse(data);
    } catch (err) {
        writeFileSync(settingsFile, JSON.stringify(defaultSettings));
    }
}

export function getSetting(key: keyof Settings) {
    return settings[key];
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    settings[key] = value;
    writeFileSync(settingsFile, JSON.stringify(settings));
}

export function getAllSettings() {
    return settings;
}

export function resetSettings() {
    writeFileSync(settingsFile, JSON.stringify(defaultSettings));
}
