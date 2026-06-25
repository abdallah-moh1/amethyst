// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

use tauri::{AppHandle, Manager, TitleBarStyle, WebviewUrl, WebviewWindow, WebviewWindowBuilder};
use uuid::Uuid;

use crate::features::{self, geodes_manager::models::GeodeIdInput};

pub fn geode_id_from_label(label: &str) -> Result<Uuid, String> {
    let id = label
        .strip_prefix("geode-")
        .ok_or_else(|| "Current window is not a geode window".to_string())?;

    Uuid::parse_str(id).map_err(|error| error.to_string())
}

pub fn create_main_window(app: &AppHandle, geode_id: Uuid) -> tauri::Result<WebviewWindow> {
    let window_label = format!("geode-{geode_id}");

    if let Some(window) = app.get_webview_window(&window_label) {
        window.show()?;
        window.unminimize()?;
        window.set_focus()?;
        return Ok(window);
    }

    let geode =
        features::geodes_manager::service::get_geode(app, GeodeIdInput { id: geode_id }).ok();
    let builder =
        WebviewWindowBuilder::new(app, &window_label, WebviewUrl::App("index.html".into()))
            .title(format!(
                "Amethyst - {}",
                geode.as_ref().map(|g| g.name.as_str()).unwrap_or("")
            ))
            .inner_size(1200.0, 800.0)
            .resizable(true)
            .visible(false)
            .min_inner_size(600.0, 400.0);

    #[cfg(target_os = "macos")]
    let builder = builder.decorations(true);

    #[cfg(not(target_os = "macos"))]
    let builder = builder.decorations(false);

    let window = builder.build()?;

    #[cfg(target_os = "macos")]
    {
        window.set_title_bar_style(TitleBarStyle::Overlay)?;
    }

    window.center()?;
    window.show()?;

    Ok(window)
}
