// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetNote, FacetNotebook } from '@shared/types/facet.type';
import { TreeItemIndex, TreeItem } from 'react-complex-tree';

export type FacetTreeItemData =
    | { type: 'note'; node: FacetNote }
    | { type: 'notebook'; node: FacetNotebook };

export type FacetTreeItem = TreeItem<FacetTreeItemData | null>;
export type FacetTree = Record<TreeItemIndex, FacetTreeItem>;
