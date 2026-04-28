// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath } from '@shared/types/facet.type';
import { commands } from '../registry';
import { useFacetStore, useInteractionStore } from '@/store';
import { FacetCommands } from './facet.commands';
import {
    createNotebook,
    deleteNotebook,
    moveNotebook,
    renameNotebook,
} from '@/clients/notebook.client';
import { CommandExecutionResult } from '@/shared/types/command.type';
import { GHOST_INDEX } from '@/features/facet-tree';
import { getUpdatedDescendantsPath } from '@/shared/utils';

export const registerNotebookCommands = () => {
    commands.register({
        id: FacetCommands.CREATE_NOTEBOOK,
        label: 'Create notebook',
        canBeOverwritten: false,
        execute: createNotebookCommandExec,
    });

    commands.register({
        id: FacetCommands.DELETE_NOTEBOOK,
        label: 'Delete notebook',
        canBeOverwritten: false,
        execute: deleteNotebookCommandExec,
    });

    commands.register({
        id: FacetCommands.MOVE_NOTEBOOK,
        label: 'Move notebook',
        canBeOverwritten: false,
        execute: moveNotebookCommandExec,
    });

    commands.register({
        id: FacetCommands.RENAME_NOTEBOOK,
        label: 'Rename notebook',
        canBeOverwritten: false,
        execute: renameNotebookCommandExec,
    });
};

// Takes as argument [parentPath] if not available use selectedItem for reference or use the root
export const createNotebookCommandExec = async (
    ...args: unknown[]
): Promise<CommandExecutionResult> => {
    const { setGhost, getResolvedParentPath } = useInteractionStore.getState();
    const { addNotebook } = useFacetStore.getState();

    // If no arguments provided, use the UI selection logic.
    // If args[0] is provided (even as null), use that value.
    const parentPath = args.length === 0 ? getResolvedParentPath() : (args[0] as ParentPath);
    const newName = args[1] as string;

    if (newName) {
        try {
            const notebook = await createNotebook(parentPath, newName);
            addNotebook(notebook);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create notebook',
            };
        }
    }

    setGhost({
        index: GHOST_INDEX,
        parentPath,
        type: 'notebook',
    });

    return { success: true };
};

// Takes for argument [targetPath] an path of the target to delete.
export const deleteNotebookCommandExec = async (
    ...args: unknown[]
): Promise<CommandExecutionResult> => {
    const { removeNotebook, notebooks } = useFacetStore.getState();
    const path = args[0] as string;

    if (!path || !notebooks.has(path)) {
        return { success: false, message: 'Notebook path is invalid or not found.' };
    }

    try {
        await deleteNotebook(path);
        removeNotebook(path);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to delete notebook',
        };
    }
};

// Takes as argument [oldPath, newParentPath]
export const moveNotebookCommandExec = async (
    ...args: unknown[]
): Promise<CommandExecutionResult> => {
    const { notes, notebooks, setNotes, setNotebooks } = useFacetStore.getState();
    const oldPath = args[0] as string;
    const newParentPath = args[1] as ParentPath;

    if (!oldPath || !newParentPath) {
        return { success: false, message: 'Move requires a source path and a new parent path.' };
    }

    try {
        const moved = await moveNotebook(oldPath, newParentPath);
        const { updatedNotes, updatedNotebooks } = getUpdatedDescendantsPath(
            oldPath,
            moved.path,
            notes,
            notebooks,
        );

        setNotes(updatedNotes);
        setNotebooks(updatedNotebooks);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to move notebook',
        };
    }
};

// Takes as argument [path, newName].
// if newName is provided, it renames via client.
// if not, it returns success to allow the tree to trigger an inline rename.
export const renameNotebookCommandExec = async (
    ...args: unknown[]
): Promise<CommandExecutionResult> => {
    const { notes, notebooks, setNotes, setNotebooks } = useFacetStore.getState();
    const { setRenamingItem } = useInteractionStore.getState();
    const path = args[0] as string;
    const newName = args[1] as string;

    if (!path) {
        return {
            success: false,
            message: 'Rename requires the current notebook path.',
        };
    }

    if (newName) {
        try {
            const renamed = await renameNotebook(path, newName);
            const { updatedNotes, updatedNotebooks } = getUpdatedDescendantsPath(
                path,
                renamed.path,
                notes,
                notebooks,
            );

            setNotes(updatedNotes);
            setNotebooks(updatedNotebooks);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to rename notebook',
            };
        }
    }

    // if newName wasn't given trigger a tree rename and then the tree will call rename again with a newName
    setRenamingItem({
        index: path,
    });

    return { success: true };
};
