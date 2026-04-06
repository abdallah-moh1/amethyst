import { Editor } from '../editor';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { Preview } from '../preview/Preview';

import './workspace-view.css';
import { useWorkspaceStore } from '@/store';

export function WorkspaceView() {
    const noteContent = useWorkspaceStore((state) => state.noteContent);
    const setNoteContent = useWorkspaceStore((state) => state.setNoteContent);
    const viewMode = useWorkspaceStore((state) => state.viewMode);

    return (
        <div className="workspace-view">
            <WorkspaceToolbar />

            <Editor
                value={noteContent}
                onChange={setNoteContent}
                placeholder="Get Creative..."
                show={viewMode === 'editor'}
            />

            <Preview content={noteContent} show={viewMode === 'preview'} />
        </div>
    );
}
