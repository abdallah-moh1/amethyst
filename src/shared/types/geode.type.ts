export type Geode = {
    id: GeodeId;
    name: string;
    path: string;
};

export type GeodeIdInput = {
    id: GeodeId;
};

export type GeodeId = string;

export type CreateGeodeInput = {
    name: string;
    parentPath: string;
};

export type OpenFolderAsGeodeInput = {
    path: string;
};

export type RenameGeodeInput = {
    id: string;
    newName: string;
};
