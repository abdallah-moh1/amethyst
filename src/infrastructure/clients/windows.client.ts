// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Geode, GeodeIdInput } from '@/shared/types/geode.type';
import { invoke } from '@tauri-apps/api/core';
import { GeodesManagerClient } from './geodes-manager.client';
import { getCurrentWindow } from '@tauri-apps/api/window';

export class WindowsClient {
    static async openGeodeMainWindow(input: GeodeIdInput) {
        await invoke<void>('open_geode_main_window', {
            input,
        });

        await GeodesManagerClient.setLastOpenedGeodeId(input);
    }

    static async openGeodeMainWindowAndCloseCurrent(input: GeodeIdInput) {
        await this.openGeodeMainWindow(input);
        await getCurrentWindow().close();
    }

    static async openGeodesManagerWindow() {
        return await invoke<void>('open_geodes_manager_window');
    }

    static async getGeodeForCurrentWindow() {
        return await invoke<Geode>('get_geode_for_current_window');
    }
}
