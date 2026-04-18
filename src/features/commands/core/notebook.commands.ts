// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ParentPath } from '@shared/types/facet.type';
import { commands } from '../registry';
import { useFacetStore } from '@/store';
import { FacetCommands } from './facet.commands';
import { createNotebook, deleteNotebook, moveNotebook, renameNotebook } from '@/clients/notebook.client';

export const registerNotebookCommands = () => {
    const facetStore = useFacetStore;

    commands.register({
        id: FacetCommands.CREATE_NOTEBOOK,
        label: "Create notebook",
        canBeOverwritten: false,
        // args = [parentPath, name]
        execute: async (...args) => {
            const { addNotebook } = facetStore.getState();
            const parentPath = (args[0] as ParentPath) || null;
            const name = (args[1] as string) || "New Notebook";

            try {
                const notebook = await createNotebook(parentPath, name);
                addNotebook(notebook);
            } catch (error) {
                console.error(`[Amethyst] Create Notebook Failed:`, error);
            }
        }
    });

    commands.register({
        id: FacetCommands.DELETE_NOTEBOOK,
        label: "Delete notebook",
        canBeOverwritten: false,
        // args = [path]
        execute: async (...args) => {
            const { removeNotebook } = facetStore.getState();
            const path = args[0] as string;

            if (!path) return console.error("Delete Notebook: Path required.");

            // Basic safety: You might want a confirm dialog here eventually
            try {
                await deleteNotebook(path);
                removeNotebook(path);
            } catch (error) {
                console.error(`[Amethyst] Delete Notebook Failed:`, error);
            }
        }
    });

    commands.register({
        id: FacetCommands.MOVE_NOTEBOOK,
        label: "Move notebook",
        canBeOverwritten: false,
        // args = [currentPath, newParentPath]
        execute: async (...args) => {
            const { removeNotebook, addNotebook } = facetStore.getState();
            const path = args[0] as string;
            const newParentPath = args[1] as ParentPath;

            if (!path || newParentPath === undefined) return;

            try {
                const notebook = await moveNotebook(path, newParentPath);
                removeNotebook(path);
                addNotebook(notebook);
            } catch (error) {
                console.error(`[Amethyst] Move Notebook Failed:`, error);
            }
        }
    });

    // Added a Rename Notebook command to match your client
    commands.register({
        id: FacetCommands.RENAME_NOTEBOOK,
        label: "Rename notebook",
        canBeOverwritten: false,
        // args = [path, newName]
        execute: async (...args) => {
            const { removeNotebook, addNotebook } = facetStore.getState();
            const path = args[0] as string;
            const newName = args[1] as string;

            if (!path || !newName) return;

            try {
                const notebook = await renameNotebook(path, newName);
                removeNotebook(path);
                addNotebook(notebook);
            } catch (error) {
                console.error(`[Amethyst] Rename Notebook Failed:`, error);
            }
        }
    });
};
