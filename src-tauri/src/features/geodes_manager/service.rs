// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

use std::{
    fs,
    path::{Path, PathBuf},
};

use tauri::AppHandle;
use uuid::Uuid;

use super::{
    models::{
        CreateGeodeInput, Geode, GeodeIdInput, GeodesConfigFile, OpenFolderAsGeodeInput,
        RenameGeodeInput,
    },
    storage,
};

pub fn list_geodes(app: &AppHandle) -> Result<Vec<Geode>, String> {
    let config = storage::load_config(app)?;
    Ok(config.geodes)
}

pub fn create_geode(
    app: &AppHandle,
    create_geode_input: CreateGeodeInput,
) -> Result<Geode, String> {
    let name = validate_folder_name_for_current_os(&create_geode_input.name)?;
    let parent_path = normalize_existing_dir(create_geode_input.parent_path)?;

    let geode_path = parent_path.join(&name);

    if geode_path.exists() {
        return Err("A file or folder with this geode name already exists".to_string());
    }

    fs::create_dir(&geode_path)
        .map_err(|error| format!("Failed to create geode folder: {}", error))?;

    open_geode_as_folder(app, OpenFolderAsGeodeInput { path: geode_path })
}

pub fn open_geode_as_folder(
    app: &AppHandle,
    geode_folder: OpenFolderAsGeodeInput,
) -> Result<Geode, String> {
    let path = normalize_existing_dir(geode_folder.path)?;

    let name = path
        .file_name()
        .ok_or_else(|| "Selected folder has no valid name".to_string())?
        .to_string_lossy()
        .to_string();

    let mut config = storage::load_config(app)?;

    if config
        .geodes
        .iter()
        .any(|geode| paths_equal(&geode.path, &path))
    {
        return Err("This folder is already added as a geode".to_string());
    }

    let geode = Geode {
        id: Uuid::new_v4(),
        name,
        path,
    };

    config.geodes.push(geode.clone());

    storage::save_config(app, &config)?;

    Ok(geode)
}

pub fn get_geode(app: &AppHandle, input: GeodeIdInput) -> Result<Geode, String> {
    let config = storage::load_config(app)?;

    config
        .geodes
        .into_iter()
        .find(|geode| geode.id == input.id)
        .ok_or_else(|| "Geode was not found".to_string())
}

pub fn get_last_opened_geode_id(app: &AppHandle) -> Result<Option<Uuid>, String> {
    let mut config = storage::load_config(app)?;

    if let Some(last_opened_geode_id) = config.last_opened_geode {
        if config
            .geodes
            .iter()
            .any(|geode| geode.id == last_opened_geode_id)
        {
            return Ok(Some(last_opened_geode_id));
        }

        config.last_opened_geode = None;
        storage::save_config(app, &config)?;
    }

    Ok(None)
}

pub fn set_last_opened_geode(app: &AppHandle, input: GeodeIdInput) -> Result<Geode, String> {
    let mut config = storage::load_config(app)?;

    let index = find_geode_index(&config, input.id)?;

    config.last_opened_geode = Some(input.id);

    let geode = config.geodes[index].clone();

    storage::save_config(app, &config)?;

    Ok(geode)
}

pub fn rename_geode(app: &AppHandle, input: RenameGeodeInput) -> Result<Geode, String> {
    let new_name = validate_folder_name_for_current_os(&input.new_name)?;

    let mut config = storage::load_config(app)?;

    let index = find_geode_index(&config, input.id)?;

    let old_path = normalize_existing_dir(config.geodes[index].path.clone())?;

    let parent_path = old_path
        .parent()
        .ok_or_else(|| "Geode folder has no parent directory".to_string())?;

    let new_path = parent_path.join(&new_name);

    if paths_equal(&old_path, &new_path) {
        config.geodes[index].name = new_name;
        config.geodes[index].path = old_path;

        let geode = config.geodes[index].clone();
        storage::save_config(app, &config)?;

        return Ok(geode);
    }

    if new_path.exists() {
        return Err("A file or folder with the new geode name already exists".to_string());
    }

    fs::rename(&old_path, &new_path).map_err(|err| format!("Failed to rename folder: {err}"))?;

    let new_path = normalize_existing_dir(new_path)?;

    config.geodes[index].name = new_name;
    config.geodes[index].path = new_path;

    let geode = config.geodes[index].clone();

    storage::save_config(app, &config)?;

    Ok(geode)
}

pub fn remove_geode_from_list(app: &AppHandle, input: GeodeIdInput) -> Result<Geode, String> {
    let mut config = storage::load_config(app)?;

    let index = find_geode_index(&config, input.id)?;
    let removed_geode = config.geodes.remove(index);

    if config.last_opened_geode == Some(removed_geode.id) {
        config.last_opened_geode = None;
    }

    storage::save_config(app, &config)?;

    Ok(removed_geode)
}

fn find_geode_index(config: &GeodesConfigFile, id: Uuid) -> Result<usize, String> {
    config
        .geodes
        .iter()
        .position(|geode| geode.id == id)
        .ok_or_else(|| "Geode was not found".to_string())
}

fn normalize_existing_dir(path: PathBuf) -> Result<PathBuf, String> {
    let canonical_path = path.canonicalize().map_err(|error| {
        format!(
            "{} does not exist or cannot be accessed: {}",
            path.display(),
            error
        )
    })?;

    if !canonical_path.is_dir() {
        return Err(format!(
            "{} is not a directory",
            path.to_string_lossy().to_string()
        ));
    }

    Ok(canonical_path)
}

#[cfg(windows)]
fn paths_equal(left: &Path, right: &Path) -> bool {
    let left = left.canonicalize().unwrap_or_else(|_| left.to_path_buf());
    let right = right.canonicalize().unwrap_or_else(|_| right.to_path_buf());

    left.to_string_lossy()
        .eq_ignore_ascii_case(&right.to_string_lossy())
}

#[cfg(not(windows))]
fn paths_equal(left: &Path, right: &Path) -> bool {
    let left = left.canonicalize().unwrap_or_else(|_| left.to_path_buf());
    let right = right.canonicalize().unwrap_or_else(|_| right.to_path_buf());

    left == right
}

fn validate_folder_name_for_current_os(name: &str) -> Result<String, String> {
    let trimmed = name.trim();

    if trimmed.is_empty() {
        return Err("Geode has to have a name".to_string());
    }

    if trimmed == "." || trimmed == ".." {
        return Err("Geode name cannot be '.' or '..'".to_string());
    }

    if trimmed.chars().any(|character| character == '\0') {
        return Err("Geode name cannot contain null bytes".to_string());
    }

    if cfg!(windows) {
        validate_windows_folder_name(trimmed)?;
    } else {
        validate_unix_folder_name(trimmed)?;
    }

    Ok(trimmed.to_string())
}

fn validate_unix_folder_name(name: &str) -> Result<(), String> {
    // Linux and macOS path components cannot contain `/` or NUL.
    // A trailing `.` is valid here, so we allow it.
    if name.contains('/') {
        return Err("Geode name cannot contain '/'".to_string());
    }

    Ok(())
}

fn validate_windows_folder_name(name: &str) -> Result<(), String> {
    if name.ends_with('.') || name.ends_with(' ') {
        return Err("On Windows, geode names cannot end with a dot or space".to_string());
    }

    if name.chars().any(is_invalid_windows_filename_char) {
        return Err("Geode name contains characters that are invalid on Windows".to_string());
    }

    if is_windows_reserved_filename(name) {
        return Err("Geode name is reserved by Windows".to_string());
    }

    Ok(())
}

fn is_invalid_windows_filename_char(character: char) -> bool {
    matches!(
        character,
        '<' | '>' | ':' | '"' | '/' | '\\' | '|' | '?' | '*'
    ) || character.is_control()
}

fn is_windows_reserved_filename(name: &str) -> bool {
    let stem = name.split('.').next().unwrap_or(name).to_ascii_uppercase();

    matches!(stem.as_str(), "CON" | "PRN" | "AUX" | "NUL")
        || is_windows_reserved_numbered_filename(&stem, "COM")
        || is_windows_reserved_numbered_filename(&stem, "LPT")
}

fn is_windows_reserved_numbered_filename(name: &str, prefix: &str) -> bool {
    let bytes = name.as_bytes();

    name.len() == 4 && name.starts_with(prefix) && bytes[3].is_ascii_digit() && bytes[3] != b'0'
}
