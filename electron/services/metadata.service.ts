// electron/services/metadata.service.ts

import { MetadataConfig, NoteMetadata, NotebookMetadata } from '../../shared/types/config.type.js';
import { ConfigService } from './config.service.js';

export class MetadataService {
    constructor(private configService: ConfigService) {}

    getMetadata(): MetadataConfig {
        return this.configService.readMetadataFile();
    }

    saveMetadata(metadata: MetadataConfig): void {
        this.configService.writeMetadataFile(metadata);
    }

    updateMetadata(updater: (metadata: MetadataConfig) => void): MetadataConfig {
        const metadata = this.getMetadata();
        updater(metadata);
        this.saveMetadata(metadata);
        return metadata;
    }

    findNoteById(noteId: string): NoteMetadata | undefined {
        return this.getMetadata().notes.find((note) => note.id === noteId);
    }

    findNotebookById(notebookId: string): NotebookMetadata | undefined {
        return this.getMetadata().notebooks.find((notebook) => notebook.id === notebookId);
    }

    getNoteIndexById(metadata: MetadataConfig, noteId: string): number {
        return metadata.notes.findIndex((note) => note.id === noteId);
    }

    getNotebookIndexById(metadata: MetadataConfig, notebookId: string): number {
        return metadata.notebooks.findIndex((notebook) => notebook.id === notebookId);
    }

    requireNote(
        metadata: MetadataConfig,
        noteId: string,
    ): {
        note: NoteMetadata;
        index: number;
    } {
        const index = this.getNoteIndexById(metadata, noteId);
        if (index < 0) {
            throw new Error("Note doesn't exist");
        }

        return {
            note: metadata.notes[index],
            index,
        };
    }

    requireNotebook(
        metadata: MetadataConfig,
        notebookId: string,
    ): {
        notebook: NotebookMetadata;
        index: number;
    } {
        const index = this.getNotebookIndexById(metadata, notebookId);
        if (index < 0) {
            throw new Error("Notebook doesn't exist");
        }

        return {
            notebook: metadata.notebooks[index],
            index,
        };
    }

    addNote(note: NoteMetadata): MetadataConfig {
        return this.updateMetadata((metadata) => {
            metadata.notes.push(note);
        });
    }

    addNotebook(notebook: NotebookMetadata): MetadataConfig {
        return this.updateMetadata((metadata) => {
            metadata.notebooks.push(notebook);
        });
    }

    updateNote(noteId: string, updater: (note: NoteMetadata) => void): MetadataConfig {
        return this.updateMetadata((metadata) => {
            const { note, index } = this.requireNote(metadata, noteId);
            updater(note);
            metadata.notes[index] = note;
        });
    }

    updateNotebook(
        notebookId: string,
        updater: (notebook: NotebookMetadata) => void,
    ): MetadataConfig {
        return this.updateMetadata((metadata) => {
            const { notebook, index } = this.requireNotebook(metadata, notebookId);
            updater(notebook);
            metadata.notebooks[index] = notebook;
        });
    }

    removeNote(noteId: string): { metadata: MetadataConfig; removed: NoteMetadata } {
        let removed: NoteMetadata | undefined;

        const metadata = this.updateMetadata((current) => {
            const { index } = this.requireNote(current, noteId);
            removed = current.notes.splice(index, 1)[0];
        });

        if (!removed) {
            throw new Error("Note doesn't exist");
        }

        return { metadata, removed };
    }

    removeNotebook(notebookId: string): { metadata: MetadataConfig; removed: NotebookMetadata } {
        let removed: NotebookMetadata | undefined;

        const metadata = this.updateMetadata((current) => {
            const { index } = this.requireNotebook(current, notebookId);
            removed = current.notebooks.splice(index, 1)[0];
        });

        if (!removed) {
            throw new Error("Notebook doesn't exist");
        }

        return { metadata, removed };
    }
}
