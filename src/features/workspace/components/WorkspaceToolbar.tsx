import { NoteNameInput } from './NoteNameInput';
import { ViewingModeSwitcher } from './ViewingModeSwitcher';

export function WorkspaceToolbar() {
    return (
        <div className="workspace-toolbar">
            <NoteNameInput />
            <ViewingModeSwitcher />
        </div>
    );
}
