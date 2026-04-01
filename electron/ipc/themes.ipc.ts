import { ipcMain } from "electron";
import { getTheme, listThemes } from "../services/themes.service.js";


export function registerThemesIpc() {
    ipcMain.handle("get:theme", (_event, key) => {
        return getTheme(key);
    });
    ipcMain.handle("list:themes", (_event) => {
        return listThemes();
    });
};
