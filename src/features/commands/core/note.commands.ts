// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath } from '@shared/types/facet.type';
import { commands } from '../registry';
import { useWorkspaceStore } from '@/store/workspace.store';
import { useFacetStore, useInteractionStore } from '@/store';
import { deleteNote, moveNote, openNote, renameNote, saveNote } from '@/clients/note.client';
import { FacetCommands } from './facet.commands';
import { CommandExecutionResult } from '@/types/command.type';
import { GHOST_INDEX } from '@/features/sidebar/tree/FacetTree';
import { getParentRelativePath } from '@/utils';

export const registerNoteCommands = () => {
    commands.register({
        id: FacetCommands.CREATE_NOTE,
        label: 'Create note',
        canBeOverwritten: false,
        execute: createNoteCommandExec
    });

    commands.register({
        id: FacetCommands.OPEN_NOTE,
        label: 'Open note',
        canBeOverwritten: false,
        execute: openNoteCommandExec
    });

    commands.register({
        id: FacetCommands.SAVE_NOTE,
        label: 'Save note',
        canBeOverwritten: false,
        execute: saveNoteCommandExec
    });

    commands.register({
        id: FacetCommands.RENAME_NOTE,
        label: 'Rename note',
        canBeOverwritten: false,
        execute: renameNoteCommandExec
    });

    commands.register({
        id: FacetCommands.MOVE_NOTE,
        label: 'Move note',
        canBeOverwritten: false,
        execute: moveNoteCommandExec
    });

    commands.register({
        id: FacetCommands.DELETE_NOTE,
        label: 'Delete note',
        canBeOverwritten: false,
        execute: deleteNoteCommandExec
    });
};

// Takes as argument [parentPath] if not available use selectedItem for reference or use the root
const createNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { setGhost } = useInteractionStore.getState();
    const { selectedItem } = useInteractionStore.getState();

    let parentPath = null;

    if (args.length === 0) {
        parentPath = selectedItem
            ? selectedItem.type === 'note'
                ? getParentRelativePath(selectedItem.path)
                : selectedItem.path
            : null;
    }
    else {
        parentPath = args[0] as ParentPath;
    }


    setGhost({
        index: GHOST_INDEX,
        parentPath,
        type: 'note',
    });

    return { success: true };
};

const openNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const id = args[0] as string;
    if (!id) return { success: false, message: 'Note ID is required to open a note.' };

    const { notes } = useFacetStore.getState();
    const { setNoteContent, setNoteName, setCurrentNoteId } = useWorkspaceStore.getState();

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
};

export const saveNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { currentNoteId, noteContent } = useWorkspaceStore.getState();

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
};

export const renameNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { removeNote, addNote } = useFacetStore.getState();
    const { currentNoteId, setNoteName } = useWorkspaceStore.getState();

    const id = (args[0] as string) || currentNoteId;
    const newName = args[1] as string;

    if (!id || !newName) {
        return {
            success: false,
            message: 'Rename requires both a note ID and a new name.',
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
};

export const moveNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { removeNote, addNote } = useFacetStore.getState();
    const id = (args[0] as string) || useWorkspaceStore.getState().currentNoteId;
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
};

export const deleteNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { notes, removeNote } = useFacetStore.getState();
    const { currentNoteId, setCurrentNoteId, setNoteContent } = useWorkspaceStore.getState();

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
};