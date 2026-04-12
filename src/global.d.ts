import { BuiltInThemes, Theme } from '@shared/types/themes.type';
import { Settings } from '@shared/types/settings.type';
import { FacetNote, FacetNotebook, ParentPath } from '@shared/types/facet.type';

export {};

declare global {
    interface Window {
        amethyst: {
            settings: {
                get: (key: keyof Settings) => Promise<Settings[keyof Settings]>;
                set: <K extends keyof Settings>(key: K, value: Settings[K]) => Promise<void>;
                reset: () => Promise<void>;
                getAll: () => Promise<Settings>;
            };
            themes: {
                get: (key: BuiltInThemes) => Promise<Theme>;
                list: () => Promise<BuiltInThemes[]>;
            };
            facet: {
                open: () => Promise<{ notes: FacetNote[]; notebooks: FacetNotebook[] }>;
                close: () => Promise<void>;
                on: {
                    noteAdded: (cb: (note: FacetNote) => void) => () => void;
                    noteChanged: (cb: (note: FacetNote) => void) => () => void;
                    noteRemoved: (cb: (id: string) => void) => () => void;
                    notebookAdded: (cb: (notebook: FacetNotebook) => void) => () => void;
                    notebookRemoved: (cb: (path: string) => void) => () => void;
                };
            };
            notes: {
                create: (name: string, parentPath: ParentPath) => Promise<FacetNote>;
                open: (id: string) => Promise<string>;
                save: (id: string, content: string) => Promise<void>;
                rename: (id: string, newName: string) => Promise<FacetNote>;
                move: (id: string, newParentPath: ParentPath) => Promise<FacetNote>;
                delete: (id: string) => Promise<void>;
            };
            notebooks: {
                create: (parentPath: ParentPath, name: string) => Promise<FacetNotebook>;
                rename: (path: string, newName: string) => Promise<FacetNotebook>;
                move: (path: string, newParentPath: ParentPath) => Promise<FacetNotebook>;
                delete: (path: string) => Promise<void>;
            };
        };
    }
}
