import { useEffect, useState } from 'react';
import { Editor } from '../editor';

import './workspace-view.css';

export function WorkspaceView() {
    const [value, setValue] = useState('## Initial Note');

    useEffect(() => {}, [value]);

    return (
        <div className="workspace-view">
            <Editor value={value} onChange={setValue} placeholder="Get Creative..." />
        </div>
    );
}
