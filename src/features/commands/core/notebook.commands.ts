// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath } from '@shared/types/facet.type';
import { commands } from '../registry';
import { useFacetStore, useInteractionStore } from '@/store';
import { FacetCommands } from './facet.commands';
import { deleteNotebook, moveNotebook, renameNotebook } from '@/clients/notebook.client';
import { CommandExecutionResult } from '@/types/command.type';
import { GHOST_INDEX } from '@/features/sidebar/tree/FacetTree';
import { getParentRelativePath, getUpdatedDescendantsPath } from '@/utils';


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

export const createNotebookCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { setGhost, selectedItem } = useInteractionStore.getState();

    const parentPath =
        args.length === 0
            ? selectedItem
                ? selectedItem.type === 'note'
                    ? getParentRelativePath(selectedItem.path)
                    : selectedItem.path
                : null
            : (args[0] as ParentPath);

    setGhost({
        index: GHOST_INDEX,
        parentPath,
        type: 'notebook',
    });

    return { success: true };
};

export const deleteNotebookCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { removeNotebook } = useFacetStore.getState();
    const path = args[0] as string;

    if (!path) return { success: false, message: 'Notebook path is required for deletion.' };

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

export const moveNotebookCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { notes, notebooks, setNotes, setNotebooks } = useFacetStore.getState();
    const oldPath = args[0] as string;
    const newParentPath = args[1] as ParentPath;

    if (!oldPath) return { success: false, message: 'Source path is required to move a notebook.' };

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

export const renameNotebookCommandExec = async (...args: unknown[]): Promise<CommandExecutionResult> => {
    const { notes, notebooks, setNotes, setNotebooks } = useFacetStore.getState();
    const oldPath = args[0] as string;
    const newName = args[1] as string;

    if (!oldPath || !newName) {
        return {
            success: false,
            message: 'Rename requires both the current path and a new name.',
        };
    }

    try {
        const renamed = await renameNotebook(oldPath, newName);
        const { updatedNotes, updatedNotebooks } = getUpdatedDescendantsPath(
            oldPath,
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
};