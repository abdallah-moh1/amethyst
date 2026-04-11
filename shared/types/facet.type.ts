import { FacetNote } from './note.type.js';
import { FacetNotebook } from './notebook.type.js';

export type Facet = {
    path: string;
    name: string;
    notes: FacetNote[];
    notebooks: FacetNotebook[];
};
