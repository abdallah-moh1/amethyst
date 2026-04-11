export type FacetNote = {
    id: string,          // uuid from frontmatter
    path: string,        // relative path to facet(a vault) on disk
    notebook: string,    // parent folder path
    name: string,        // filename without .md
    createdAt: Date,   // from fs.stat birthtime
    modifiedAt: Date,  // from fs.stat mtime
};