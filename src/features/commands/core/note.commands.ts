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
    saveNote // Assuming this exists in your client
} from '@/clients/note.client';
import { FacetCommands } from './facet.commands';

export const registerNoteCommands = () => {
    const workspaceStore = useWorkspaceStore;
    const facetStore = useFacetStore;

    // --- Note Operations ---

    commands.register({
        id: FacetCommands.CREATE_NOTE,
        label: "Create note",
        canBeOverwritten: false,
        execute: async (...args) => {
            const { addNote } = facetStore.getState();

            // Palette fallback: If no name, you might want to prompt or use 'Untitled'
            const name = (args[0] as string) || "Untitled";
            const parentPath = (args[1] || null) as ParentPath;

            try {
                const note = await createNote(name, parentPath);
                addNote(note);
                // Optional: Automatically open the note after creation
                // commands.execute(FacetCommands.OPEN_NOTE, note.id);
            } catch (error) {
                console.error(`[Amethyst] Create Failed:`, error);
            }
        }
    });

    commands.register({
        id: FacetCommands.OPEN_NOTE,
        label: "Open note",
        canBeOverwritten: false,
        execute: async (...args) => {
            const { notes } = facetStore.getState();
            const { setNoteContent, setNoteName, setCurrentNoteId } = workspaceStore.getState();

            const id = args[0] as string;
            if (!id) return console.error(`Command [${FacetCommands.OPEN_NOTE}]: ID is required.`);

            const note = notes.get(id);
            if (!note) return console.error(`Note with id:${id} doesn't exist`);

            try {
                const content = await openNote(id);
                setNoteContent(content);
                setNoteName(note.name);
                setCurrentNoteId(note.id);
            } catch (error) {
                console.error(`[Amethyst] Open Failed:`, error);
            }
        }
    });

    commands.register({
        id: FacetCommands.SAVE_NOTE,
        label: "Save note",
        canBeOverwritten: false,
        // Smart fallback for Palette/Hotkey usage
        execute: async (...args) => {
            const { currentNoteId, noteContent } = workspaceStore.getState();

            // Priority: 1. Argument 2. Currently active note
            const targetId = (args[0] as string) || currentNoteId;
            const content = (args[1] as string) || noteContent;

            if (!targetId) return console.warn("No active note to save.");

            try {
                await saveNote(targetId, content);
                console.log(`[Amethyst] Note ${targetId} saved successfully.`);
                // You could trigger a 'last saved' timestamp update here
            } catch (error) {
                console.error(`[Amethyst] Save Failed:`, error);
            }
        }
    });

    commands.register({
        id: FacetCommands.RENAME_NOTE,
        label: "Rename note",
        canBeOverwritten: false,
        execute: async (...args) => {
            const { removeNote, addNote } = facetStore.getState();
            const { currentNoteId, setNoteName } = workspaceStore.getState();

            const id = (args[0] as string) || currentNoteId;
            const newName = args[1] as string;

            if (!id || !newName) return console.error("Rename requires an ID and a New Name.");

            try {
                const note = await renameNote(id, newName);
                removeNote(id);
                addNote(note);

                // If the renamed note is the one currently open, update UI name
                if (id === currentNoteId) setNoteName(newName);
            } catch (error) {
                console.error(`[Amethyst] Rename Failed:`, error);
            }
        }
    });

    commands.register({
        id: FacetCommands.MOVE_NOTE,
        label: "Move note",
        canBeOverwritten: false,
        execute: async (...args) => {
            const { removeNote, addNote } = facetStore.getState();
            const id = (args[0] as string) || workspaceStore.getState().currentNoteId;
            const newParentPath = args[1] as ParentPath;

            if (!id || !newParentPath) return console.error("Move requires target ID and new path.");

            try {
                const note = await moveNote(id, newParentPath);
                removeNote(id);
                addNote(note);
            } catch (error) {
                console.error(`[Amethyst] Move Failed:`, error);
            }
        }
    });

    commands.register({
        id: FacetCommands.DELETE_NOTE,
        label: "Delete note",
        canBeOverwritten: false,
        execute: async (...args) => {
            const { notes, removeNote } = facetStore.getState();
            const { currentNoteId, setCurrentNoteId, setNoteContent } = workspaceStore.getState();

            const target = (args[0] as string) || currentNoteId;

            if (!target || !notes.has(target)) {
                return console.error(`Delete target [${target}] invalid or not found.`);
            }

            try {
                // If deleting the open note, clear the workspace
                if (target === currentNoteId) {
                    setCurrentNoteId(null);
                    setNoteContent("");
                }
                await deleteNote(target);
                removeNote(target);
            } catch (error) {
                console.error(`[Amethyst] Delete Failed:`, error);
            }
        }
    });
};