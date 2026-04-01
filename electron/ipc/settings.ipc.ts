import { ipcMain } from "electron";
import { getAllSettings, getSetting, resetSettings, setSetting } from "../services/settings.service.js";


export function registerSettingsIpc() {
    ipcMain.handle("get:setting", (_event, key) => {
        return getSetting(key);
    });

    ipcMain.handle("set:setting", (_event, key, value) => {
        setSetting(key, value);
    });

    ipcMain.handle("reset:settings", (_event) => {
        resetSettings();
    });

    ipcMain.handle("get-all:settings", (_event) => {
        return getAllSettings();
    });
};
