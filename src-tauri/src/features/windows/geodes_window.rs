use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindow, WebviewWindowBuilder};

pub const GEODES_MANAGER: &str = "geodes-manager";
// pub const GEODE_WINDOW_PREFIX: &str = "geode-";

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
            .inner_size(600.0, 500.0)
            .resizable(false)
            .center();

    #[cfg(target_os = "macos")]
    let builder = builder.decorations(true);

    #[cfg(not(target_os = "macos"))]
    let builder = builder.decorations(false);

    let window = builder.build()?;

    #[cfg(target_os = "macos")]
    {
        window.set_title_bar_style(TitleBarStyle::Overlay)?;
    }

    Ok(window)
}
