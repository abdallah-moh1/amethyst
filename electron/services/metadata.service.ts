// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { MetadataConfig, NoteMetadata, NotebookMetadata } from '../../shared/types/config.type.js';
import { ConfigService } from './config.service.js';

export class MetadataService {
    constructor(private configService: ConfigService) {}

    async getMetadata(): Promise<MetadataConfig> {
        return await this.configService.readMetadataFile();
    }

    saveMetadata(metadata: MetadataConfig): void {
        this.configService.writeMetadataFile(metadata);
    }

    async updateMetadata(updater: (metadata: MetadataConfig) => void): Promise<MetadataConfig> {
        const metadata = await this.getMetadata();
        updater(metadata);
        this.saveMetadata(metadata);
        return metadata;
    }

    async findNoteById(noteId: string): Promise<NoteMetadata | undefined> {
        return (await this.getMetadata()).notes.find((note) => note.id === noteId);
    }

    async findNotebookById(notebookId: string): Promise<NotebookMetadata | undefined> {
        return (await this.getMetadata()).notebooks.find((notebook) => notebook.id === notebookId);
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

    async addNote(note: NoteMetadata): Promise<MetadataConfig> {
        return await this.updateMetadata((metadata) => {
            metadata.notes.push(note);
        });
    }

    async addNotebook(notebook: NotebookMetadata): Promise<MetadataConfig> {
        return await this.updateMetadata((metadata) => {
            metadata.notebooks.push(notebook);
        });
    }

    async updateNote(
        noteId: string,
        updater: (note: NoteMetadata) => void,
    ): Promise<MetadataConfig> {
        return await this.updateMetadata((metadata) => {
            const { note, index } = this.requireNote(metadata, noteId);
            updater(note);
            metadata.notes[index] = note;
        });
    }

    async updateNotebook(
        notebookId: string,
        updater: (notebook: NotebookMetadata) => void,
    ): Promise<MetadataConfig> {
        return await this.updateMetadata((metadata) => {
            const { notebook, index } = this.requireNotebook(metadata, notebookId);
            updater(notebook);
            metadata.notebooks[index] = notebook;
        });
    }

    async removeNote(noteId: string): Promise<{ metadata: MetadataConfig; removed: NoteMetadata }> {
        let removed: NoteMetadata | undefined;

        const metadata = await this.updateMetadata((current) => {
            const { index } = this.requireNote(current, noteId);
            removed = current.notes.splice(index, 1)[0];
        });

        if (!removed) {
            throw new Error("Note doesn't exist");
        }

        return { metadata, removed };
    }

    async removeNotebook(
        notebookId: string,
    ): Promise<{ metadata: MetadataConfig; removed: NotebookMetadata }> {
        let removed: NotebookMetadata | undefined;

        const metadata = await this.updateMetadata((current) => {
            const { index } = this.requireNotebook(current, notebookId);
            removed = current.notebooks.splice(index, 1)[0];
        });

        if (!removed) {
            throw new Error("Notebook doesn't exist");
        }

        return { metadata, removed };
    }
}
