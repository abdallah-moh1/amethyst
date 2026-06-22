// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

mod features;

use crate::features::{
    geodes_manager,
    windows::{self, geodes_manager_window, main_window},
};

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            geodes_manager::commands::list_geodes,
            geodes_manager::commands::create_geode,
            geodes_manager::commands::open_geode_as_folder,
            geodes_manager::commands::get_geode,
            geodes_manager::commands::get_last_opened_geode_id,
            geodes_manager::commands::set_last_opened_geode,
            geodes_manager::commands::rename_geode,
            geodes_manager::commands::remove_geode_from_list,
            windows::commands::open_geode_main_window,
        ])
        .setup(|app| {
            let app_handle = app.handle();

            if let Some(last_opened_geode_id) =
                geodes_manager::service::get_last_opened_geode_id(app_handle)?
            {
                main_window::create_main_window(app_handle, last_opened_geode_id)?;
                return Ok(());
            }

            geodes_manager_window::create_geodes_manager_window(app_handle)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
