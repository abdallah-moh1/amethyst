mod windows;

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle();

            if let Err(error) = windows::create_geodes_manager_window(app_handle) {
                println!("There was an error {}", error);
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
