// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ReactNode, useCallback, useMemo } from 'react';
import { buildFacetTree, ROOT_ID } from '../utils/treeAdapter';
import { useFacetStore, useInteractionStore } from '@/store';
import { GHOST_INDEX } from '../FacetTree';
import { FacetTreeItem } from '@/shared/types/tree.type';
import { TreeInformation, TreeItemRenderContext } from 'react-complex-tree';
import { useContextMenu } from '@/shared/hooks/useContextMenu';
import { ContextMenuItem } from '@/shared/types/context-menu.type';
import { useNoteActions } from '@/features/notes';
import { useNotebookActions } from '@/features/notebooks';

/**
 * Generates the class string for the <li> element based on the tree item state.
 * This matches the parent combinators used in your CSS (e.g., .rct-tree-item-li-selected > .container)
 */
function getLiClass(isFolder: boolean, context: TreeItemRenderContext): string {
    const classes = ['rct-tree-item-li'];

    if (isFolder) {
        classes.push('rct-tree-item-li-isFolder');
    }

    if (context.isSelected) {
        classes.push('rct-tree-item-li-selected');
    }

    if (context.isExpanded) {
        // This is required for your CSS animation: .rct-tree-item-li > .rct-tree-items-container
        classes.push('rct-tree-item-li-expanded');
    }

    if (context.isFocused) {
        classes.push('rct-tree-item-li-focused');
    }

    if (context.isDraggingOver) {
        classes.push('rct-tree-item-li-dragging-over');
    }

    if (context.isDraggingOverParent) {
        classes.push('rct-tree-item-li-parent-of-dragging-over');
    }

    if (context.isSearchMatching) {
        classes.push('rct-tree-item-li-search-match');
    }

    return classes.join(' ');
}

export function useItems() {
    const notesMap = useFacetStore((s) => s.notes);
    const notebooksMap = useFacetStore((s) => s.notebooks);

    const ghost = useInteractionStore((s) => s.ghost);

    const contextMenu = useContextMenu();
    const noteActions = useNoteActions();
    const notebookActions = useNotebookActions();

    const baseItems = useMemo(
        () => buildFacetTree(Array.from(notesMap.values()), Array.from(notebooksMap.values())),
        [notesMap, notebooksMap],
    );

    // Inject ghost into the tree if one exists
    const items = useMemo(() => {
        if (!ghost) return baseItems;

        const parentIndex = ghost.parentPath ?? ROOT_ID;
        const injected = { ...baseItems };

        // Clone the parent so we don't mutate
        injected[parentIndex] = {
            ...injected[parentIndex],
            children: [...(injected[parentIndex]?.children ?? []), GHOST_INDEX],
        };

        injected[GHOST_INDEX] = {
            index: GHOST_INDEX,
            isFolder: ghost.type === 'notebook',
            children: [],
            data: null, // RCT will render it as '' via getItemTitle
        };

        return injected;
    }, [baseItems, ghost]);

    const renderItems = useCallback(
        ({
            item,
            arrow,
            title,
            context,
            children,
            depth,
        }: {
            item: FacetTreeItem;
            depth: number;
            children: ReactNode | null;
            title: ReactNode;
            arrow: ReactNode;
            context: TreeItemRenderContext<'expandedItems' | 'selectedItems'>;
            info: TreeInformation;
        }) => {
            const { data } = item;

            // These are the props that turn a normal div/button into the tree's focusable/draggable item
            const interactiveProps = context.interactiveElementProps;

            const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (!data) return;
                e.preventDefault();

                let contextItems: ContextMenuItem[] = [];

                if (data.type === 'notebook') {
                    contextItems = [
                        {
                            label: 'New Note',
                            action: () => noteActions.create({ parentPath: data.node.path }),
                        },
                        {
                            label: 'New Notebook',
                            action: () => notebookActions.create({ parentPath: data.node.path }),
                        },
                        { separator: true },
                        {
                            label: 'Rename',
                            action: () => notebookActions.rename({ path: data.node.path }),
                        },
                        {
                            label: 'Delete',
                            variant: 'destructive',
                            action: () => notebookActions.remove({ path: data.node.path }),
                        },
                    ];
                } else {
                    contextItems = [
                        {
                            label: 'Rename',
                            action: () => noteActions.rename({ id: item.index as string }),
                        },
                        {
                            label: 'Delete',
                            variant: 'destructive',
                            action: () => noteActions.remove({ id: data.node.id }),
                        },
                    ];
                }

                contextMenu.open(e, contextItems);
            };

            return (
                <li
                    {...context.itemContainerWithChildrenProps}
                    className={getLiClass(item.isFolder ?? false, context)}
                >
                    <div
                        {...context.itemContainerWithoutChildrenProps}
                        className={`rct-tree-item-title-container ${
                            item.isFolder ? 'rct-tree-item-title-container-isFolder' : ''
                        } ${context.isSelected ? 'rct-tree-item-title-container-selected' : ''} ${
                            context.isExpanded ? 'rct-tree-item-title-container-expanded' : ''
                        }`}
                        style={
                            {
                                '--depthOffset': `${(depth + 1) * 10}px`,
                            } as React.CSSProperties
                        }
                        onContextMenu={(e) => {
                            handleContextMenu(e);
                        }}
                    >
                        {arrow}

                        {/* 2. The Interactive Element (The Button) */}
                        {context.isRenaming ? (
                            /* When renaming, RCT usually provides the form in the 'title' prop */
                            title
                        ) : (
                            <button
                                {...interactiveProps}
                                type="button"
                                className={`rct-tree-item-button ${
                                    item.isFolder ? 'rct-tree-item-button-isFolder' : ''
                                } ${context.isSelected ? 'rct-tree-item-button-selected' : ''} ${
                                    context.isExpanded ? 'rct-tree-item-button-expanded' : ''
                                }`}
                                data-rct-item-id={item.index}
                                data-rct-item-focus={context.isFocused}
                            >
                                {title}
                            </button>
                        )}
                    </div>

                    {children}
                </li>
            );
        },
        [contextMenu, noteActions, notebookActions],
    );

    return { items, renderItems, contextMenu };
}
