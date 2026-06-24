// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

use tauri::{AppHandle, Manager, TitleBarStyle, WebviewUrl, WebviewWindow, WebviewWindowBuilder};

pub const GEODES_MANAGER: &str = "geodes-manager";

pub fn create_geodes_manager_window(app: &AppHandle) -> tauri::Result<WebviewWindow> {
    if let Some(window) = app.get_webview_window(GEODES_MANAGER) {
        window.show()?;
        window.unminimize()?;
        window.set_focus()?;
        return Ok(window);
    }

    let builder =
        WebviewWindowBuilder::new(app, GEODES_MANAGER, WebviewUrl::App("index.html".into()))
            .title("Amethyst")
            .inner_size(700.0, 600.0)
            .resizable(false)
            .visible(false);

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
