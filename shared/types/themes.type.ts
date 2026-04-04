export const BUILTIN_THEMES = ["amethyst-dark", "amethyst-light"] as const;

export type BuiltInThemes = typeof BUILTIN_THEMES[number];

export type Theme = {
    id: string;
    name: string;
    author: string;
    version: number;
    type: "built-in" | "custom";
    app: {
        accent: string;
        primary: string;
        "bg-primary": string;
        "bg-secondary": string;
        "text-primary": string;
        "text-secondary": string;
    };
    editor: {
        ui: {
            bg: string;
            text: string;
            "text-muted": string;
            caret: string;
            selection: string;
            "active-line": string;
            "gutter-bg": string;
            "gutter-text": string;
            border: string;
            "fold-placeholder-bg": string;
            "fold-placeholder-text": string;
        };
        markdown: {
            "heading-1": string;
            "heading-2": string;
            "heading-3": string;
            "heading-4": string;
            "heading-5": string;
            "heading-6": string;
            quote: string;
            link: string;
            bold: string;
            italic: string;
            "inline-code-bg": string;
            "inline-code-text": string;
            "code-block-bg": string;
            hr: string;
        };
        syntax: {
            keyword: string;
            string: string;
            comment: string;
            number: string;
            variable: string;
            type: string;
            function: string;
            operator: string;
        };
    };
    scrollbar: {
        thumb: string;
        "thumb-hover": string;
        "thumb-active": string;
    };
};