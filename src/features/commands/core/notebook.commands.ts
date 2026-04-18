// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath, FacetNote, FacetNotebook } from '@shared/types/facet.type';
import { commands } from '../registry';
import { useFacetStore } from '@/store';
import { FacetCommands } from './facet.commands';
import {
    createNotebook,
    deleteNotebook,
    moveNotebook,
    renameNotebook,
} from '@/clients/notebook.client';

/**
 * Safely updates descendants when a parent path changes.
 */
const getUpdatedDescendants = (
    oldPath: string,
    newPath: string,
    notes: Map<string, FacetNote>,
    notebooks: Map<string, FacetNotebook>
) => {
    // We check for startsWith(oldPath) but ensure we handle trailing slashes 
    // to avoid partial folder name matches (e.g., /Work vs /Work-Old)
    const isDescendant = (path: string) => path === oldPath || path.startsWith(`${oldPath}/`);

    const updatedNotes = Array.from(notes.values()).map((note) => {
        if (isDescendant(note.path)) {
            return {
                ...note,
                path: note.path.replace(oldPath, newPath),
                parentPath: note.parentPath === oldPath
                    ? newPath
                    : note.parentPath?.replace(oldPath, newPath) || null
            };
        }
        return note;
    });

    const updatedNotebooks = Array.from(notebooks.values()).map((nb) => {
        if (isDescendant(nb.path)) {
            return {
                ...nb,
                path: nb.path.replace(oldPath, newPath),
                parentPath: nb.parentPath === oldPath
                    ? newPath
                    : nb.parentPath?.replace(oldPath, newPath) || null
            };
        }
        return nb;
    });

    return { updatedNotes, updatedNotebooks };
};

export const registerNotebookCommands = () => {
    const facetStore = useFacetStore;

    commands.register({
        id: FacetCommands.CREATE_NOTEBOOK,
        label: 'Create notebook',
        canBeOverwritten: false,
        execute: async (...args) => {
            const { addNotebook } = facetStore.getState();
            const name = (args[0] as string) || 'New Notebook';
            const parentPath = (args[1] as ParentPath) || null;

            try {
                const notebook = await createNotebook(parentPath, name);
                addNotebook(notebook);
            } catch (error) {
                console.error(`[Amethyst] Create Notebook Failed:`, error);
            }
        },
    });

    commands.register({
        id: FacetCommands.DELETE_NOTEBOOK,
        label: 'Delete notebook',
        canBeOverwritten: false,
        execute: async (...args) => {
            const { removeNotebook } = facetStore.getState();
            const path = args[0] as string;

            if (!path) return;

            try {
                await deleteNotebook(path);
                removeNotebook(path);
                // Ensure your store.removeNotebook is recursive!
            } catch (error) {
                console.error(`[Amethyst] Delete Notebook Failed:`, error);
            }
        },
    });

    commands.register({
        id: FacetCommands.MOVE_NOTEBOOK,
        label: 'Move notebook',
        canBeOverwritten: false,
        execute: async (...args) => {
            const { notes, notebooks, setNotes, setNotebooks } = facetStore.getState();
            const oldPath = args[0] as string;
            const newParentPath = args[1] as ParentPath;

            if (!oldPath) return;

            try {
                const moved = await moveNotebook(oldPath, newParentPath);
                const { updatedNotes, updatedNotebooks } = getUpdatedDescendants(
                    oldPath,
                    moved.path,
                    notes,
                    notebooks
                );

                setNotes(updatedNotes);
                setNotebooks(updatedNotebooks);
            } catch (error) {
                console.error(`[Amethyst] Move Failed:`, error);
            }
        },
    });

    commands.register({
        id: FacetCommands.RENAME_NOTEBOOK,
        label: 'Rename notebook',
        canBeOverwritten: false,
        execute: async (...args) => {
            const { notes, notebooks, setNotes, setNotebooks } = facetStore.getState();
            const oldPath = args[0] as string;
            const newName = args[1] as string;

            if (!oldPath || !newName) return;

            try {
                const renamed = await renameNotebook(oldPath, newName);
                const { updatedNotes, updatedNotebooks } = getUpdatedDescendants(
                    oldPath,
                    renamed.path,
                    notes,
                    notebooks
                );

                setNotes(updatedNotes);
                setNotebooks(updatedNotebooks);
            } catch (error) {
                console.error(`[Amethyst] Rename Failed:`, error);
            }
        },
    });
};