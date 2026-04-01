import { BuiltInThemes, Theme } from "@shared/types/themes.type";

export { };

declare global {
    interface Window {
        amethyst: {
            settings: {
                get: (key: keyof Settings) => Promise<Settings[keyof Settings]>;
                set: <K extends keyof Settings>(key: K, value: Settings[K]) => Promise<void>;
                reset: () => Promise<void>;
                getAll: () => Promise<Settings>;
            },
            themes: {
                get: (key: BuiltInThemes) => Promise<Theme>,
                list: () => Promise<Theme[]>,
            },
        };
    }
}