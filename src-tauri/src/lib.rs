// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

mod features;

use crate::features::{geodes, windows};

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            geodes::commands::list_geodes,
            geodes::commands::create_geode,
            geodes::commands::open_geode_as_folder,
            geodes::commands::get_geode,
            geodes::commands::get_last_opened_geode_id,
            geodes::commands::set_last_opened_geode,
            geodes::commands::rename_geode,
            geodes::commands::remove_geode_from_list,
            windows::commands::get_geode_for_current_window,
            windows::commands::open_geode_main_window,
            windows::commands::open_geodes_manager_window
        ])
        .setup(|app| {
            let app_handle = app.handle();

            if let Some(last_opened_geode_id) =
                geodes::service::get_last_opened_geode_id(app_handle)?
            {
                windows::service::create_main_window(app_handle, last_opened_geode_id)?;
                return Ok(());
            }

            windows::service::create_geodes_manager_window(app_handle)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
