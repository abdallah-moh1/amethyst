// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, FacetNotebook } from "../../../shared/types/facet.type.js";
import { FacetScanService } from "./facet-scan.service.js";

export class FacetService {
    private notes: Map<string, FacetNote>;
    private notebooks: Map<string, FacetNotebook>;

    constructor(private facetPath: string) {
        this.notes = new Map();
        this.notebooks = new Map();
    }

    async openFacet(): Promise<{
        notes: FacetNote[],
        notebooks: FacetNotebook[];
    }> {
        await FacetScanService.scanDisk(this.facetPath, this);

        return {
            notes: [...this.notes.values()],
            notebooks: [...this.notebooks.values()]
        };
    }

    getFacetPath(): string {
        return this.facetPath;
    }

    getNotes(): ReadonlyMap<string, FacetNote> {
        return this.notes;
    }

    getNotebooks(): ReadonlyMap<string, FacetNotebook> {
        return this.notebooks;
    }

    addNotebook(notebook: FacetNotebook) {
        this.notebooks.set(notebook.path, notebook);
    }

    getNotebook(path: string) {
        return this.notebooks.get(path);
    }

    removeNotebook(path: string) {
        this.notebooks.delete(path);
    }

    addNote(note: FacetNote) {
        this.notes.set(note.id, note);
    }

    getNote(id: string) {
        return this.notes.get(id);
    }

    removeNote(id: string) {
        this.notes.delete(id);
    }

}