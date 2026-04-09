export type NoteMetadata = {
    id: string;
    path: string; // relative path from safe root
    createdAt: string; // ISO string
    updatedAt: string | null; // ISO string
};

export type NotebookMetadata = {
    id: string;
    path: string; // relative path from safe root
    createdAt: string; // ISO string
    updatedAt: string | null; // ISO string
};

export type MetadataConfig = {
    version: 1;
    notes: NoteMetadata[];
    notebooks: NotebookMetadata[];
};

export type WorkspaceConfig = {
    version: 1;
    lastOpenedNoteId: string | null;
    expandedNotebookPaths: string[];
};
