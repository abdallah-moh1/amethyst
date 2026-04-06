import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { GFM, Emoji } from '@lezer/markdown';

export const markdownExtensions = [
    markdown({
        // Prevent the app from showing sytax highlighting for markdown code blocks, since we don't want to show it in the preview
        codeLanguages: languages.filter(({ name }) => !(name === 'Markdown')),
        extensions: [GFM, Emoji],
    }),
];
