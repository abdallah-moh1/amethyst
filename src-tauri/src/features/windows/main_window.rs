use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindow, WebviewWindowBuilder};
use uuid::Uuid;

pub const GEODE_WINDOW_PREFIX: &str = "geode-";

pub fn create_main_window(app: &AppHandle, geode_id: Uuid) -> tauri::Result<WebviewWindow> {
    let window_label = format!("{GEODE_WINDOW_PREFIX}{geode_id}");

    if let Some(window) = app.get_webview_window(&window_label) {
        window.show()?;
        window.unminimize()?;
        window.set_focus()?;
        return Ok(window);
    }

    let builder =
        WebviewWindowBuilder::new(app, &window_label, WebviewUrl::App("index.html".into()))
            .title("Amethyst")
            .inner_size(1200.0, 800.0)
            .resizable(true)
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
