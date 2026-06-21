// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

use std::{fs, io::ErrorKind, path::PathBuf, process};

use tauri::{AppHandle, Manager};

use super::models::GeodesConfigFile;

const GEODES_CONFIG_FILE: &str = "geodes.json";

fn config_path(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app
        .path()
        .app_config_dir()
        .map_err(|error| error.to_string())?;

    fs::create_dir_all(&dir).map_err(|error| error.to_string())?;

    Ok(dir.join(GEODES_CONFIG_FILE))
}

pub fn load_config(app: &AppHandle) -> Result<GeodesConfigFile, String> {
    let path = config_path(app)?;

    let content = match fs::read_to_string(&path) {
        Ok(content) => content,
        Err(error) if error.kind() == ErrorKind::NotFound => {
            return Ok(GeodesConfigFile::default());
        }
        Err(error) => {
            return Err(format!(
                "Failed to read geodes config at {}: {}",
                path.display(),
                error
            ));
        }
    };

    if content.trim().is_empty() {
        return Ok(GeodesConfigFile::default());
    }

    serde_json::from_str(&content).map_err(|error| {
        format!(
            "Failed to parse geodes config at {}: {}",
            path.display(),
            error
        )
    })
}

pub fn save_config(app: &AppHandle, config: &GeodesConfigFile) -> Result<(), String> {
    let path = config_path(app)?;

    let mut content = serde_json::to_string_pretty(config).map_err(|error| error.to_string())?;
    content.push('\n');

    let temp_path = path.with_extension(format!("json.tmp.{}", process::id()));

    fs::write(&temp_path, content).map_err(|error| {
        format!(
            "Failed to write temporary geodes config at {}: {}",
            temp_path.display(),
            error
        )
    })?;

    fs::rename(&temp_path, &path).map_err(|error| {
        let _ = fs::remove_file(&temp_path);

        format!(
            "Failed to save geodes config at {}: {}",
            path.display(),
            error
        )
    })
}
