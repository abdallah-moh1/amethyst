use tauri::{AppHandle, Window};

use crate::features::{
    self,
    geodes::models::{Geode, GeodeIdInput},
};

#[tauri::command]
pub fn open_geodes_manager_window(app: AppHandle) -> Result<(), String> {
    super::service::create_geodes_manager_window(&app).map_err(|err| err.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn open_geode_main_window(app: AppHandle, input: GeodeIdInput) -> Result<(), String> {
    super::service::create_main_window(&app, input.id).map_err(|err| err.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn get_geode_for_current_window(app: AppHandle, window: Window) -> Result<Geode, String> {
    let id = super::service::geode_id_from_label(window.label())?;
    features::geodes::service::get_geode(&app, GeodeIdInput { id: id })
}
