import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
    {
        ignores: ['dist', 'dist-electron', 'node_modules'],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },

    {
        files: ['electron/**/*.ts', 'shared/**/*.ts', 'vite.config.ts'],
        languageOptions: {
            parserOptions: {
                project: path.join(__dirname, 'tsconfig.node.json'),
                tsconfigRootDir: __dirname,
            },
            globals: {
                ...globals.node,
            },
        },
    },

    eslintConfigPrettier,
);
