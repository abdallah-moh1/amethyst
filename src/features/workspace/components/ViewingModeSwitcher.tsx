import { Eye, SquarePen, SquareSplitHorizontal } from 'lucide-react';
import { ViewModeSwitcherBtn } from './ViewModeSwitcherBtn';

export function ViewingModeSwitcher() {
    return (
        <div className="viewing-mode-switcher">
            <ViewModeSwitcherBtn mode="editor" Icon={SquarePen} />
            <ViewModeSwitcherBtn mode="preview" Icon={Eye} />
            <ViewModeSwitcherBtn mode="split-view" Icon={SquareSplitHorizontal} />
        </div>
    );
}
