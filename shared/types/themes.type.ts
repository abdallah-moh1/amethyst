export const BUILTIN_THEMES = ['amethyst-dark', 'amethyst-light'] as const;

export type BuiltInThemes = typeof BUILTIN_THEMES[number];

export type Theme = {
    id: string;
    name: string;
    author: string;
    version: number;
    type: 'built-in' | 'custom';
    app: {
        accent: string;
        primary: string;
        'bg-primary': string;
        'bg-secondary': string;
        'text-primary': string;
        'text-secondary': string;
    };
};
