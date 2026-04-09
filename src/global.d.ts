import { TreeNode } from '@shared/types/tree.type';
import { BuiltInThemes, Theme } from '@shared/types/themes.type';
import { Settings } from '@shared/types/settings.type';
import {
    NoteMetadata,
    NotebookMetadata,
    WorkspaceConfig,
    MetadataConfig,
} from '@shared/types/config.type';

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

            workspace: {
                loadSnapshot: () => Promise<{
                    metadata: MetadataConfig;
                    workspace: WorkspaceConfig;
                    tree: TreeNode[];
                    activeNote: {
                        metadata: NoteMetadata;
                        content: string;
                    } | null;
                }>;
                get: () => Promise<WorkspaceConfig>;
                setLastOpenedNote: (noteId: string | null) => Promise<void>;
                setExpandedNotebooks: (paths: string[]) => Promise<void>;
                addExpandedNotebook: (path: string) => Promise<void>;
                removeExpandedNotebook: (path: string) => Promise<void>;
            };

            notes: {
                create: (parentPath: string | null, title: string) => Promise<NoteMetadata>;
                open: (noteId: string) => Promise<{ metadata: NoteMetadata; content: string }>;
                save: (noteId: string, content: string) => Promise<NoteMetadata>;
                rename: (noteId: string, newTitle: string) => Promise<NoteMetadata>;
                delete: (noteId: string) => Promise<void>;
            };

            notebooks: {
                create: (parentPath: string | null, name: string) => Promise<NotebookMetadata>;
                rename: (notebookId: string, newName: string) => Promise<NotebookMetadata>;
                delete: (notebookId: string) => Promise<void>;
                isEmpty: (notebookId: string) => Promise<boolean>;
            };
        };
    }
}
