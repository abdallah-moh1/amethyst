import { FilePlus, FolderPlus } from 'lucide-react';
import { NotebooksTree } from '../tree/NotebooksTree';
import { useExplorerStore } from '@/store';
import { SelectedItem } from '@/types/explorer.type';
import { useCreateNoteOrNotebook } from '../hooks/useCreateNoteOrNotebook';

export function NotebooksSection() {
    const selectedItem = useExplorerStore((s) => s.selectedItem);
    const [createNote, createNotebook] = useCreateNoteOrNotebook();

    const resolveParentPath = (item: SelectedItem) => {
        if (!item || item.path === null) return null;
        const reducedPath = item.path.split('/');
        reducedPath.pop();
        const parentPath = reducedPath.length === 0 ? null : reducedPath.join('/');

        return item.type === 'note' ? parentPath : item.path;
    };

    function handleAddNote() {
        const parentPath = resolveParentPath(selectedItem);
        createNote(parentPath);
    }

    function handleAddNotebook() {
        const parentPath = resolveParentPath(selectedItem);
        createNotebook(parentPath);
    }

    return (
        <div className="notebooks-section">
            <div className="section-header">
                <p>Notebooks</p>
                <div className="action-btns">
                    <button onClick={handleAddNote}>
                        <FilePlus width={16} />
                    </button>
                    <button>
                        <FolderPlus width={16} onClick={handleAddNotebook} />
                    </button>
                </div>
            </div>
            <NotebooksTree />
        </div>
    );
}
