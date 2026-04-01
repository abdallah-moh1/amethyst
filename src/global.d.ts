export { };

declare global {
    interface Window {
        amethyst: {
            settings: {
                get: (key: keyof Settings) => Promise<Settings[keyof Settings]>;
                set: <K extends keyof Settings>(key: K, value: Settings[K]) => Promise<void>;
            };
        };
    }
}