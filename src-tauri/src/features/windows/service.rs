// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

use tauri::{
    AppHandle, LogicalSize, Manager, TitleBarStyle, WebviewUrl, WebviewWindow, WebviewWindowBuilder,
};
use uuid::Uuid;

use crate::features::{self, geodes_manager::models::GeodeIdInput};

fn create_window(app: &AppHandle, window_label: &str, title: &str) -> tauri::Result<WebviewWindow> {
    if let Some(window) = app.get_webview_window(&window_label) {
        window.unminimize()?;
        return Ok(window);
    }

    let builder =
        WebviewWindowBuilder::new(app, window_label, WebviewUrl::App("index.html".into()))
            .title(title)
            .visible(false);

    #[cfg(target_os = "macos")]
    let builder = builder.decorations(true);

    #[cfg(not(target_os = "macos"))]
    let builder = builder.decorations(false);

    let window = builder.build()?;

    #[cfg(target_os = "macos")]
    window.set_title_bar_style(TitleBarStyle::Overlay)?;

    Ok(window)
}

pub fn create_geodes_manager_window(app: &AppHandle) -> tauri::Result<WebviewWindow> {
    let window = create_window(app, "geodes-manager", "Amethyst - Geodes Manager")?;

    window.set_resizable(false)?;

    window.center()?;
    window.show()?;
    window.set_focus()?;

    Ok(window)
}

pub fn create_main_window(app: &AppHandle, geode_id: Uuid) -> tauri::Result<WebviewWindow> {
    let geode =
        features::geodes_manager::service::get_geode(app, GeodeIdInput { id: geode_id }).ok();

    let window_label = format!("geode-{geode_id}");
    let title = format!(
        "Amethyst - {}",
        geode.as_ref().map(|g| g.name.as_str()).unwrap_or("")
    );

    let window = create_window(app, &window_label, &title)?;

    window.set_size(LogicalSize::new(1200.0, 800.0))?;

    window.center()?;
    window.show()?;
    window.set_focus()?;

    Ok(window)
}

pub fn geode_id_from_label(label: &str) -> Result<Uuid, String> {
    let id = label
        .strip_prefix("geode-")
        .ok_or_else(|| "Current window is not a geode window".to_string())?;

    Uuid::parse_str(id).map_err(|error| error.to_string())
}
