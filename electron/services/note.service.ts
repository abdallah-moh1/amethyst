import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
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
    ) {}

    private abs(path: string): string {
        return toAbsoluteSafePath(this.safePath, path);
    }

    createNote(parentPath: string | null, title: string): NoteMetadata {
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
                rmSync(this.abs(noteMetadata.path));
            }
            throw error;
        }
    }

    openNote(noteId: string): { metadata: NoteMetadata; content: string } {
        const metadata = this.metadataService.getMetadata();
        const { note } = this.metadataService.requireNote(metadata, noteId);

        return {
            metadata: note,
            content: this.readNoteContentByPath(note.path),
        };
    }

    saveNote(noteId: string, content: string): NoteMetadata {
        const metadata = this.metadataService.getMetadata();
        const { note, index } = this.metadataService.requireNote(metadata, noteId);

        this.writeNoteContentByPath(note.path, content);

        const updatedNote: NoteMetadata = {
            ...note,
            updatedAt: new Date().toISOString(),
        };

        metadata.notes[index] = updatedNote;
        this.metadataService.saveMetadata(metadata);

        return updatedNote;
    }

    renameNote(noteId: string, newTitle: string): NoteMetadata {
        const metadata = this.metadataService.getMetadata();
        const { note, index } = this.metadataService.requireNote(metadata, noteId);

        const oldPath = note.path;
        const parentPath = getParentRelativePath(oldPath);
        const newPath = parentPath
            ? joinRelativePath(parentPath, `${newTitle}.md`)
            : `${newTitle}.md`;

        if (existsSync(this.abs(newPath))) {
            throw new Error('Note already exists');
        }

        renameSync(this.abs(oldPath), this.abs(newPath));

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
            renameSync(this.abs(newPath), this.abs(oldPath));
            throw error;
        }
    }

    deleteNote(noteId: string): void {
        const metadata = this.metadataService.getMetadata();
        const { note, index } = this.metadataService.requireNote(metadata, noteId);

        rmSync(this.abs(note.path));

        metadata.notes.splice(index, 1);
        this.metadataService.saveMetadata(metadata);
    }

    readNoteContentByPath(path: string): string {
        return readFileSync(this.abs(path), 'utf-8');
    }

    writeNoteContentByPath(path: string, content: string): void {
        writeFileSync(this.abs(path), content, 'utf-8');
    }
}
