// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

export type FacetNotebook = {
    path: string; // relative path to facet(a vault) on disk also used as an id
    parentPath: ParentPath; // parent folder path
    name: string; // folder name
};

export type FacetNote = {
    id: string; // uuid from frontmatter
    path: string; // relative path to facet(a vault) on disk
    parentPath: ParentPath; // parent folder path
    name: string; // filename without .md
    createdAt: Date; // from fs.stat birthtime
    modifiedAt: Date; // from fs.stat mtime
};

export type Facet = {
    path: string;
    name: string;
    notes: FacetNote[];
    notebooks: FacetNotebook[];
};

export type ParentPath = string | null; // null is the root
