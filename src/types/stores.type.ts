import { ViewingMode } from "./workspace.type";

export type WorkspaceStore = {
    viewMode: ViewingMode;
    setViewMode: (mode: ViewingMode) => void;
};