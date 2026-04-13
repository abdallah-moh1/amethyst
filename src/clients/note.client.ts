import { FacetNote, ParentPath } from '@shared/types/facet.type';

export const openNote = (id: string) => window.amethyst.notes.open(id);
export const saveNote = (id: string, content: string) => window.amethyst.notes.save(id, content);
export const createNote = (name: string, parentPath: ParentPath) => window.amethyst.notes.create(name, parentPath);
export const renameNote = (id: string, newName: string): Promise<FacetNote> => window.amethyst.notes.rename(id, newName);
export const moveNote = (id: string, newParentPath: ParentPath): Promise<FacetNote> => window.amethyst.notes.move(id, newParentPath);
export const deleteNote = (id: string) => window.amethyst.notes.delete(id);