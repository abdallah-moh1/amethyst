mod features;

use crate::features::windows::{geodes_window, main_window};

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle();
            let geode_id = uuid::Uuid::new_v4();

            main_window::create_main_window(app_handle, geode_id)?;

            if let Err(error) = geodes_window::create_geodes_manager_window(app_handle) {
                println!("There was an error {}", error);
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
