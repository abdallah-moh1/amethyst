// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath } from '@shared/types/facet.type';
import { commands } from '../registry';
import { useWorkspaceStore } from '@/store/workspace.store';
import { useFacetStore, useInteractionStore } from '@/store';
import { NoteClient } from '@/infrastructure/clients';
import { FacetCommands } from './facet.commands';
import { CommandExecutionResult } from '@/shared/types/command.type';
import { GHOST_INDEX } from '@/features/facet-tree';

export const registerNoteCommands = () => {
    commands.register({
        id: FacetCommands.CREATE_NOTE,
        label: 'Create note',
        canBeOverwritten: false,
        execute: createNoteCommandExec,
    });

    commands.register({
        id: FacetCommands.OPEN_NOTE,
        label: 'Open note',
        canBeOverwritten: false,
        execute: openNoteCommandExec,
    });

    commands.register({
        id: FacetCommands.SAVE_NOTE,
        label: 'Save note',
        canBeOverwritten: false,
        execute: saveNoteCommandExec,
    });

    commands.register({
        id: FacetCommands.RENAME_NOTE,
        label: 'Rename note',
        canBeOverwritten: false,
        execute: renameNoteCommandExec,
    });

    commands.register({
        id: FacetCommands.MOVE_NOTE,
        label: 'Move note',
        canBeOverwritten: false,
        execute: moveNoteCommandExec,
    });

    commands.register({
        id: FacetCommands.DELETE_NOTE,
        label: 'Delete note',
        canBeOverwritten: false,
        execute: deleteNoteCommandExec,
    });
};

// Takes as argument [parentPath, name] if parentPath not available use selectedItem for reference or use the root if name not available create a ghost item
const createNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { addNote } = useFacetStore.getState();
    const { setGhost, getResolvedParentPath } = useInteractionStore.getState();

    // If no arguments provided, use the UI selection logic.
    // If args[0] is provided (even as null), use that value.
    const parentPath = args.length === 0 ? getResolvedParentPath() : (args[0] as ParentPath);

    const newName = args[1] as string;

    if (newName) {
        try {
            const note = await NoteClient.create(parentPath, newName);
            addNote(note);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create note',
            };
        }
    }

    setGhost({
        index: GHOST_INDEX,
        parentPath,
        type: 'note',
    });

    return { success: true };
};

// Takes as argument [id] the id of the note to open
const openNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const id = args[0] as string;
    if (!id) return { success: false, message: 'Note ID is required to open a note.' };

    const { notes } = useFacetStore.getState();
    const { setNoteContent, setNoteName, setCurrentNoteId } = useWorkspaceStore.getState();

    const note = notes.get(id);
    if (!note) return { success: false, message: `Note with id: ${id} does not exist.` };

    try {
        const content = await NoteClient.open(id);
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

// Takes as argument [targetId, content] if not available give error
export const saveNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { currentNoteId, noteContent } = useWorkspaceStore.getState();

    const targetId = args[0] !== undefined ? (args[0] as string) : currentNoteId;
    const content = args[1] !== undefined ? (args[1] as string) : noteContent;

    if (!targetId) return { success: false, message: 'No active note to save.' };

    try {
        await NoteClient.save(targetId, content);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to save note',
        };
    }
};
// Takes as argument [id, newName] id is required if no id was found fallback to opened note if not available give an error
// for the new name if a name was given rename the note if it wasn't given trigger a rename in the tree
export const renameNoteCommandExec = async (
    ...args: unknown[]
): Promise<CommandExecutionResult> => {
    const { removeNote, addNote } = useFacetStore.getState();
    const { currentNoteId, setNoteName } = useWorkspaceStore.getState();
    const { setRenamingItem } = useInteractionStore.getState();

    const id = (args[0] as string) || currentNoteId;
    const newName = args[1] as string;

    if (!id) {
        return {
            success: false,
            message: 'Rename requires a note ID or a note to be opened.',
        };
    }

    if (newName) {
        try {
            const note = await NoteClient.rename(id, newName);
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
    }
    // if newName wasn't given trigger a tree rename and then the tree will call rename again with a newName
    setRenamingItem({
        index: id,
    });

    return { success: true };
};

// Takes as argument [id, newParentPath] and id for the note and the new parent's path give error if not given
export const moveNoteCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { removeNote, addNote } = useFacetStore.getState();
    const id = (args[0] as string) || useWorkspaceStore.getState().currentNoteId;
    const newParentPath = args[1] as ParentPath;

    if (!id || !newParentPath)
        return { success: false, message: 'Move requires a target Note ID and new parent path.' };

    try {
        const note = await NoteClient.move(id, newParentPath);
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

// Takes for argument [target] an id of the target to delete uses the current note
export const deleteNoteCommandExec = async (
    ...args: unknown[]
): Promise<CommandExecutionResult> => {
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
        await NoteClient.delete(target);
        removeNote(target);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to delete note',
        };
    }
};
