import { ipcMain } from "electron";
import { FacetService } from "./facet.service.js";

export function registerFacetIpc(facetService: FacetService) {
    ipcMain.handle('facet:open', () => facetService.openFacet());
    // TODO: Close facet closes the watcher
    // ipcMain.handle('facet:close',  () =>  facetService.closeFacet());

    // Also TODO add events for
    // notes
    // facet:note-added        FacetNote — new file detected
    // facet:note-changed      FacetNote — file contents changed
    // facet:note-removed    string (id) — file deleted

    // notebooks
    // facet:notebook-added    FacetNotebook — new folder detected
    // facet:notebook-changed  { oldPath: string, notebook: FacetNotebook } — renamed or moved
    // facet:notebook-removed string (path) — folder deleted
}