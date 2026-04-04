import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { GFM, Emoji } from "@lezer/markdown";

export const markdownExtensions = [
    markdown({
        codeLanguages: languages,
        extensions: [
            GFM,
            Emoji
        ]
    })
];