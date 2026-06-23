use tauri::{AppHandle, Window};

use crate::features::{
    self,
    geodes_manager::models::{Geode, GeodeIdInput},
    windows::{
        geodes_manager_window::create_geodes_manager_window,
        main_window::{create_main_window, geode_id_from_label},
    },
};

#[tauri::command]
pub fn open_geodes_manager_window(app: AppHandle) -> Result<(), String> {
    create_geodes_manager_window(&app).map_err(|err| err.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn open_geode_main_window(app: AppHandle, input: GeodeIdInput) -> Result<(), String> {
    create_main_window(&app, input.id).map_err(|err| err.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn get_geode_for_current_window(app: AppHandle, window: Window) -> Result<Geode, String> {
    let id = geode_id_from_label(window.label())?;
    features::geodes_manager::service::get_geode(&app, GeodeIdInput { id: id })
}
