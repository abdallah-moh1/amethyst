import { FacetNote, FacetNotebook } from "@shared/types/facet.type";

export function getParentRelativePath(path: string): string | null {
    const parts = path.split('/');
    if (parts.length <= 1) return null;

    parts.pop();

    return parts.join('/');
}

/**
 * Safely updates descendants when a parent path changes.
 */
export function getUpdatedDescendantsPath(
    oldPath: string,
    newPath: string,
    notes: Map<string, FacetNote>,
    notebooks: Map<string, FacetNotebook>,
) {
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