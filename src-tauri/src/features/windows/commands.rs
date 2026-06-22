use tauri::AppHandle;

use crate::features::{
    geodes_manager::models::GeodeIdInput, windows::main_window::create_main_window,
};

#[tauri::command]
pub fn open_geode_main_window(app: AppHandle, input: GeodeIdInput) -> Result<(), String> {
    create_main_window(&app, input.id).map_err(|err| err.to_string())?;
    Ok(())
}
