import { BuiltInThemes } from "@shared/types/themes.type";

export async function getTheme(key: BuiltInThemes) {
    return await window.amethyst.themes.get(key);
}

export async function listThemes() {
    return await window.amethyst.themes.list();
}

export async function applyTheme(key: BuiltInThemes) {
    const root = document.documentElement;
    const theme = await getTheme(key);

    Object.entries(theme.app).forEach(([key, value]) => {
        root.style.setProperty(`--app-color-${key}`, value);
    });

}
