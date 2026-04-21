// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath } from '@shared/types/facet.type';
import { commands } from '../registry';
import { useWorkspaceStore } from '@/store/workspace.store';
import { useFacetStore } from '@/store';
import {
    createNote,
    deleteNote,
    moveNote,
    openNote,
    renameNote,
    saveNote,
} from '@/clients/note.client';
import { FacetCommands } from './facet.commands';
import { CommandExecutionResult } from '@/types/command.type';

export const registerNoteCommands = () => {
    const workspaceStore = useWorkspaceStore;
    const facetStore = useFacetStore;

    // --- Note Operations ---

    commands.register({
        id: FacetCommands.CREATE_NOTE,
        label: 'Create note',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { addNote } = facetStore.getState();
            const name = (args[0] as string) || 'Untitled';
            const parentPath = (args[1] || null) as ParentPath;

            try {
                const note = await createNote(name, parentPath);
                addNote(note);
                return { success: true };
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to create note',
                };
            }
        },
    });

    commands.register({
        id: FacetCommands.OPEN_NOTE,
        label: 'Open note',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { notes } = facetStore.getState();
            const { setNoteContent, setNoteName, setCurrentNoteId } = workspaceStore.getState();

            const id = args[0] as string;
            if (!id) return { success: false, message: 'Note ID is required to open a note.' };

            const note = notes.get(id);
            if (!note) return { success: false, message: `Note with id: ${id} does not exist.` };

            try {
                const content = await openNote(id);
                setNoteContent(content);
                setNoteName(note.name);
                setCurrentNoteId(note.id);
                return { success: true };
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to open note',
                };
            }
        },
    });

    commands.register({
        id: FacetCommands.SAVE_NOTE,
        label: 'Save note',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { currentNoteId, noteContent } = workspaceStore.getState();

            const targetId = (args[0] as string) || currentNoteId;
            const content = (args[1] as string) || noteContent;

            if (!targetId) return { success: false, message: 'No active note to save.' };

            try {
                await saveNote(targetId, content);
                return { success: true };
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to save note',
                };
            }
        },
    });

    commands.register({
        id: FacetCommands.RENAME_NOTE,
        label: 'Rename note',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { removeNote, addNote } = facetStore.getState();
            const { currentNoteId, setNoteName } = workspaceStore.getState();

            const id = (args[0] as string) || currentNoteId;
            const newName = args[1] as string;

            if (!id || !newName) {
                return {
                    success: false,
                    message: 'Rename requires both a Note ID and a new name.',
                };
            }

            try {
                const note = await renameNote(id, newName);
                removeNote(id);
                addNote(note);

                if (id === currentNoteId) setNoteName(newName);
                return { success: true };
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to rename note',
                };
            }
        },
    });

    commands.register({
        id: FacetCommands.MOVE_NOTE,
        label: 'Move note',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { removeNote, addNote } = facetStore.getState();
            const id = (args[0] as string) || workspaceStore.getState().currentNoteId;
            const newParentPath = args[1] as ParentPath;

            if (!id) return { success: false, message: 'Move requires a target Note ID.' };

            try {
                const note = await moveNote(id, newParentPath);
                removeNote(id);
                addNote(note);
                return { success: true };
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to move note',
                };
            }
        },
    });

    commands.register({
        id: FacetCommands.DELETE_NOTE,
        label: 'Delete note',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { notes, removeNote } = facetStore.getState();
            const { currentNoteId, setCurrentNoteId, setNoteContent } = workspaceStore.getState();

            const target = (args[0] as string) || currentNoteId;

            if (!target || !notes.has(target)) {
                return { success: false, message: 'Delete target invalid or not found.' };
            }

            try {
                if (target === currentNoteId) {
                    setCurrentNoteId(null);
                    setNoteContent('');
                }
                await deleteNote(target);
                removeNote(target);
                return { success: true };
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to delete note',
                };
            }
        },
    });
};
