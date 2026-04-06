import { useWorkspaceStore } from '@/store';
import { Eye, SquarePen } from 'lucide-react';

export function ViewingModeSwitcher() {
    const viewMode = useWorkspaceStore((state) => state.viewMode);
    const setViewMode = useWorkspaceStore((state) => state.setViewMode);

    return (
        <div className="viewing-mode-switcher">
            <div
                className={`switcher-btn ${viewMode === 'editor' ? 'active' : ''}`}
                onClick={() => {
                    setViewMode('editor');
                }}
            >
                <SquarePen width={20} />
            </div>
            <div
                className={`switcher-btn ${viewMode === 'preview' ? 'active' : ''}`}
                onClick={() => {
                    setViewMode('preview');
                }}
            >
                <Eye width={20} />
            </div>
        </div>
    );
}
