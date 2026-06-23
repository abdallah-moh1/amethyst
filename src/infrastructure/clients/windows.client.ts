// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Geode, GeodeIdInput } from '@/shared/types/geode.type';
import { invoke } from '@tauri-apps/api/core';

export class WindowsClient {
    static async openGeodeMainWindow(input: GeodeIdInput) {
        return await invoke<void>('open_geode_main_window', {
            input,
        });
    }
    static async openGeodesManagerWindow() {
        return await invoke<void>('open_geodes_manager_window');
    }

    static async getGeodeForCurrentWindow() {
        return await invoke<Geode>('get_geode_for_current_window');
    }
}
