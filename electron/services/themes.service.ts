import { BUILTIN_THEMES, BuiltInThemes } from "../../shared/types/themes.type.js";

export async function getTheme(themeId: BuiltInThemes) {
    return { ...(await import(`../themes/${themeId}.json`, { with: { type: 'json' } })) };
}

export function listThemes() {
    return Object.values(BUILTIN_THEMES);
}