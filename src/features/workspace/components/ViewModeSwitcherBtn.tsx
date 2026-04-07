import { useWorkspaceStore } from '@/store';
import { ViewModeSwitcherBtnProps } from '../types/workspace.type';

export function ViewModeSwitcherBtn({ mode, Icon, width }: ViewModeSwitcherBtnProps) {
    const viewMode = useWorkspaceStore((state) => state.viewMode);
    const setViewMode = useWorkspaceStore((state) => state.setViewMode);
    return (
        <div
            className={`switcher-btn ${viewMode === mode ? 'active' : ''}`}
            onClick={() => {
                setViewMode(mode);
            }}
        >
            <Icon width={width ?? 20} />
        </div>
    );
}
