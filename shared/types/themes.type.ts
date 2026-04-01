export const BUILTIN_THEMES = ['amethyst-dark', 'amethyst-light'] as const;

export type BuiltInThemes = typeof BUILTIN_THEMES[number];