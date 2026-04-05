import { WorkspaceStore } from "@/types/stores.type";
import { create } from "zustand";

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    viewMode: "editor",
    setViewMode: (mode) => {
        set({ viewMode: mode });
    }
}));