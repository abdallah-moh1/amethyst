import { useInteractionStore } from "@/store";
import { RefObject, useCallback, useEffect } from "react";
import { GHOST_INDEX } from "../FacetTree";
import { FacetTreeItem } from "@/types/tree.type";
import { commands, FacetCommands } from "@/features/commands";
import { TreeRef } from "react-complex-tree";

export function useItemRename(treeRef: RefObject<TreeRef<FacetTreeItem> | null>) {
    const ghost = useInteractionStore((s) => s.ghost);
    const setGhost = useInteractionStore((s) => s.setGhost);

    const expandedItems = useInteractionStore((s) => s.expandedItems);
    const setExpandedItems = useInteractionStore((s) => s.setExpandedItems);

    // As soon as the ghost appears, tell RCT to start renaming it
    useEffect(() => {
        if (ghost) {
            // Small delay — RCT needs one render to mount the item first
            if (ghost.parentPath) {
                const already = expandedItems.includes(ghost.parentPath);
                if (!already) {
                    setExpandedItems([...expandedItems, ghost.parentPath]);
                }
            }
            const id = setTimeout(() => {
                treeRef.current?.startRenamingItem(GHOST_INDEX);
            }, 0);
            return () => clearTimeout(id);
        }
    }, [ghost, treeRef, expandedItems, setExpandedItems]);

    const handleRenameItem = useCallback(
        async (item: FacetTreeItem, newName: string) => {
            if (item.index === GHOST_INDEX && ghost) {
                if (ghost.type === 'note') {
                    commands.execute(FacetCommands.CREATE_NOTE, newName, ghost.parentPath);
                } else {
                    commands.execute(FacetCommands.CREATE_NOTEBOOK, newName, ghost.parentPath);
                }
                setGhost(null);
            }
            else {
                if (item.data?.type === 'note') {
                    commands.execute(FacetCommands.RENAME_NOTE, item.data.node.id, newName);
                }
                else if (item.data?.type === 'notebook') {
                    commands.execute(FacetCommands.RENAME_NOTE, item.data.node.path, newName);
                }
            }
        },
        [ghost, setGhost],
    );

    const handleAbort = useCallback(() => {
        // User pressed Escape — discard the ghost
        setGhost(null);
    }, [setGhost]);

    return {
        handleRenameItem,
        handleAbort
    };
}