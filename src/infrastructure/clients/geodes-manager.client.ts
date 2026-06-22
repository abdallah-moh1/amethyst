// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { CreateGeodeInput, Geode, GeodeId, GeodeIdInput, OpenFolderAsGeodeInput, RenameGeodeInput } from "@/shared/types/geode.type";
import { invoke } from "@tauri-apps/api/core";

export class GeodesManagerClient {
    static async openGeodeMainWindow(id: GeodeIdInput) {
        return await invoke<void>("open_geode_main_window", {
            input: {
                id
            }
        });
    }

    static async listGeodes() {
        return await invoke<Geode[]>("list_geodes");
    }

    static async createGeode(input: CreateGeodeInput) {
        return await invoke<Geode>("create_geode", {
            input: input
        });
    }

    static async openGeodeAsFolder(input: OpenFolderAsGeodeInput) {
        return await invoke<Geode>("open_geode_as_folder", {
            input: input
        });
    }

    static async getGeode(input: GeodeIdInput) {
        return await invoke<Geode>("get_geode", {
            input: input
        });
    }

    static async getLastOpenedGeodeId() {
        return await invoke<GeodeId>("get_last_opened_geode_id");
    }

    static async setLastOpenedGeodeId(input: GeodeIdInput) {
        return await invoke<void>("set_last_opened_geode", {
            input: input
        });
    }

    static async renameGeode(input: RenameGeodeInput) {
        return await invoke<Geode>("rename_geode", {
            input: input
        });
    }

    static async removeGeodeFromList(input: GeodeIdInput) {
        return await invoke<Geode>("remove_geode_from_list", {
            input: input
        });
    }

}
