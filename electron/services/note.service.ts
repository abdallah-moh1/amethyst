// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { existsSync } from 'node:fs';
import { readFile, rename, rm, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

import { NoteMetadata } from '../../shared/types/config.type.js';
import {
    getParentRelativePath,
    joinRelativePath,
    toAbsoluteSafePath,
} from '../utils/path.utils.js';
import { MetadataService } from './metadata.service.js';

export class NoteService {
    constructor(
        private safePath: string,
        private metadataService: MetadataService,
    ) { }

    private abs(path: string): string {
        return toAbsoluteSafePath(this.safePath, path);
    }

    async createNote(parentPath: string | null, title: string): Promise<NoteMetadata> {
        const path = parentPath ? joinRelativePath(parentPath, `${title}.md`) : `${title}.md`;

        if (existsSync(this.abs(path))) {
            throw new Error('Note already exists');
        }

        const noteMetadata: NoteMetadata = {
            id: randomUUID(),
            path,
            createdAt: new Date().toISOString(),
            updatedAt: null,
        };

        try {
            this.writeNoteContentByPath(noteMetadata.path, '');
            this.metadataService.addNote(noteMetadata);
            return noteMetadata;
        } catch (error) {
            if (existsSync(this.abs(noteMetadata.path))) {
                await rm(this.abs(noteMetadata.path));
            }
            throw error;
        }
    }

    async openNote(noteId: string): Promise<{ metadata: NoteMetadata; content: string; }> {
        const metadata = await this.metadataService.getMetadata();
        const { note } = this.metadataService.requireNote(metadata, noteId);

        return {
            metadata: note,
            content: await this.readNoteContentByPath(note.path),
        };
    }

    async saveNote(noteId: string, content: string): Promise<NoteMetadata> {
        const metadata = await this.metadataService.getMetadata();
        const { note, index } = this.metadataService.requireNote(metadata, noteId);

        await this.writeNoteContentByPath(note.path, content);

        const updatedNote: NoteMetadata = {
            ...note,
            updatedAt: new Date().toISOString(),
        };

        metadata.notes[index] = updatedNote;
        this.metadataService.saveMetadata(metadata);

        return updatedNote;
    }

    async renameNote(noteId: string, newTitle: string): Promise<NoteMetadata> {
        const metadata = await this.metadataService.getMetadata();
        const { note, index } = this.metadataService.requireNote(metadata, noteId);

        const oldPath = note.path;
        const parentPath = getParentRelativePath(oldPath);
        const newPath = parentPath
            ? joinRelativePath(parentPath, `${newTitle}.md`)
            : `${newTitle}.md`;

        if (existsSync(this.abs(newPath))) {
            throw new Error('Note already exists');
        }

        await rename(this.abs(oldPath), this.abs(newPath));

        const updatedNote: NoteMetadata = {
            ...note,
            path: newPath,
            updatedAt: new Date().toISOString(),
        };

        try {
            metadata.notes[index] = updatedNote;
            this.metadataService.saveMetadata(metadata);
            return updatedNote;
        } catch (error) {
            await rename(this.abs(newPath), this.abs(oldPath));
            throw error;
        }
    }

    async deleteNote(noteId: string): Promise<void> {
        const metadata = await this.metadataService.getMetadata();
        const { note, index } = this.metadataService.requireNote(metadata, noteId);

        await rm(this.abs(note.path));

        metadata.notes.splice(index, 1);
        this.metadataService.saveMetadata(metadata);
    }

    readNoteContentByPath(path: string): Promise<string> {
        return readFile(this.abs(path), 'utf-8');
    }

    async writeNoteContentByPath(path: string, content: string): Promise<void> {
        await writeFile(this.abs(path), content, 'utf-8');
    }
}
