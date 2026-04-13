import { FilePlus, FolderPlus } from 'lucide-react';
import { FacetTree } from '../tree/FacetTree';

export function NotebooksSection() {
    function handleAddNote() {}

    function handleAddNotebook() {}

    return (
        <div className="notebooks-section">
            <div className="section-header">
                <p>Notebooks</p>
                <div className="action-btns">
                    <button onClick={handleAddNote}>
                        <FilePlus width={16} />
                    </button>
                    <button onClick={handleAddNotebook}>
                        <FolderPlus width={16} />
                    </button>
                </div>
            </div>
            <div className="section-tree">
                <FacetTree />
            </div>
        </div>
    );
}
