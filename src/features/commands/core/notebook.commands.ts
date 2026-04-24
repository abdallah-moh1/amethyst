// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath, FacetNote, FacetNotebook } from '@shared/types/facet.type';
import { commands } from '../registry';
import { useFacetStore, useInteractionStore } from '@/store';
import { FacetCommands } from './facet.commands';
import { deleteNotebook, moveNotebook, renameNotebook } from '@/clients/notebook.client';
import { CommandExecutionResult } from '@/types/command.type';
import { GHOST_INDEX } from '@/features/sidebar/tree/FacetTree';
import { getParentRelativePath } from '@/utils';

/**
 * Safely updates descendants when a parent path changes.
 */
const getUpdatedDescendants = (
    oldPath: string,
    newPath: string,
    notes: Map<string, FacetNote>,
    notebooks: Map<string, FacetNotebook>,
) => {
    const isDescendant = (path: string) => path === oldPath || path.startsWith(`${oldPath}/`);

    const updatedNotes = Array.from(notes.values()).map((note) => {
        if (isDescendant(note.path)) {
            return {
                ...note,
                path: note.path.replace(oldPath, newPath),
                parentPath:
                    note.parentPath === oldPath
                        ? newPath
                        : note.parentPath?.replace(oldPath, newPath) || null,
            };
        }
        return note;
    });

    const updatedNotebooks = Array.from(notebooks.values()).map((nb) => {
        if (isDescendant(nb.path)) {
            return {
                ...nb,
                path: nb.path.replace(oldPath, newPath),
                parentPath:
                    nb.parentPath === oldPath
                        ? newPath
                        : nb.parentPath?.replace(oldPath, newPath) || null,
            };
        }
        return nb;
    });

    return { updatedNotes, updatedNotebooks };
};

export const registerNotebookCommands = () => {
    const facetStore = useFacetStore;
    const interactionStore = useInteractionStore;

    commands.register({
        id: FacetCommands.CREATE_NOTEBOOK,
        label: 'Create notebook',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { setGhost } = interactionStore.getState();
            const { selectedItem } = interactionStore.getState();

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
        },
    });

    commands.register({
        id: FacetCommands.DELETE_NOTEBOOK,
        label: 'Delete notebook',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { removeNotebook } = facetStore.getState();
            const path = args[0] as string;

            if (!path)
                return { success: false, message: 'Notebook path is required for deletion.' };

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
        },
    });

    commands.register({
        id: FacetCommands.MOVE_NOTEBOOK,
        label: 'Move notebook',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { notes, notebooks, setNotes, setNotebooks } = facetStore.getState();
            const oldPath = args[0] as string;
            const newParentPath = args[1] as ParentPath;

            if (!oldPath)
                return { success: false, message: 'Source path is required to move a notebook.' };

            try {
                const moved = await moveNotebook(oldPath, newParentPath);
                const { updatedNotes, updatedNotebooks } = getUpdatedDescendants(
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
        },
    });

    commands.register({
        id: FacetCommands.RENAME_NOTEBOOK,
        label: 'Rename notebook',
        canBeOverwritten: false,
        execute: async (...args): Promise<CommandExecutionResult> => {
            const { notes, notebooks, setNotes, setNotebooks } = facetStore.getState();
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
                const { updatedNotes, updatedNotebooks } = getUpdatedDescendants(
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
        },
    });
};
