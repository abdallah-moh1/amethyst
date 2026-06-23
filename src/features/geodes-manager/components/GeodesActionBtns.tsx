// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { GeodesManagerClient } from '@/infrastructure/clients/geodes-manager.client';
import '../styles/geodes-action-btns.css';

import { open } from '@tauri-apps/plugin-dialog';
import { WindowsClient } from '@/infrastructure/clients/windows.client';

export function GeodesActionBtns() {
    function handleCreateGeodeBtn() {}

    async function handleOpenFolderAsGeodeBtn() {
        const folderPath = await open({
            directory: true,
            multiple: false,
        });

        if (!folderPath) return;

        const geode = await GeodesManagerClient.openGeodeAsFolder({
            path: folderPath,
        });

        await WindowsClient.openGeodeMainWindowAndCloseCurrent({
            id: geode.id,
        });
    }

    return (
        <div className="geodes-manager-actions">
            <button className="create-geode" onClick={handleCreateGeodeBtn}>
                Create a Geode
            </button>
            <button className="open-folder" onClick={handleOpenFolderAsGeodeBtn}>
                Open folder as a Geode
            </button>
        </div>
    );
}
