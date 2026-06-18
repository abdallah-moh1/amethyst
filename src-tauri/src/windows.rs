use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindow, WebviewWindowBuilder};

pub const GEODES_MANAGER: &str = "geodes-manager";
// pub const GEODE_WINDOW_PREFIX: &str = "geode-";

pub fn create_geodes_manager_window(app: &AppHandle) -> tauri::Result<WebviewWindow> {
    if let Some(window) = app.get_webview_window(GEODES_MANAGER) {
        window.show()?;
        window.set_focus()?;
        return Ok(window);
    }

    WebviewWindowBuilder::new(app, GEODES_MANAGER, WebviewUrl::App("index.html".into()))
        .title("Amethyst")
        .inner_size(600.0, 400.0)
        .resizable(false)
        .decorations(cfg!(target_os = "macos"))
        .center()
        .build()
}
