// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { ipcMain } from 'electron';
import { FacetService } from './facet.service.js';

export function registerFacetIpc(facetService: FacetService) {
    ipcMain.handle('facet:open', () => facetService.openFacet());
    ipcMain.handle('facet:close', () => facetService.closeFacet());
}
