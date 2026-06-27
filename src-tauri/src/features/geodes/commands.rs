// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

use tauri::AppHandle;
use uuid::Uuid;

use super::{
    models::{CreateGeodeInput, Geode, GeodeIdInput, OpenFolderAsGeodeInput, RenameGeodeInput},
    service,
};

#[tauri::command]
pub fn list_geodes(app: AppHandle) -> Result<Vec<Geode>, String> {
    service::list_geodes(&app)
}

#[tauri::command]
pub fn create_geode(app: AppHandle, input: CreateGeodeInput) -> Result<Geode, String> {
    service::create_geode(&app, input)
}

#[tauri::command]
pub fn open_geode_as_folder(
    app: AppHandle,
    input: OpenFolderAsGeodeInput,
) -> Result<Geode, String> {
    service::open_geode_as_folder(&app, input)
}

#[tauri::command]
pub fn get_geode(app: AppHandle, input: GeodeIdInput) -> Result<Geode, String> {
    service::get_geode(&app, input)
}

#[tauri::command]
pub fn get_last_opened_geode_id(app: AppHandle) -> Result<Option<Uuid>, String> {
    service::get_last_opened_geode_id(&app)
}

#[tauri::command]
pub fn set_last_opened_geode(app: AppHandle, input: GeodeIdInput) -> Result<Geode, String> {
    service::set_last_opened_geode(&app, input)
}

#[tauri::command]
pub fn rename_geode(app: AppHandle, input: RenameGeodeInput) -> Result<Geode, String> {
    service::rename_geode(&app, input)
}

#[tauri::command]
pub fn remove_geode_from_list(app: AppHandle, input: GeodeIdInput) -> Result<Geode, String> {
    service::remove_geode_from_list(&app, input)
}
