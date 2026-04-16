// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useWorkspaceStore } from '@/store';
import { useEffect, useState } from 'react';

export function NoteNameInput() {
    const noteName = useWorkspaceStore((s) => s.noteName);
    // const setNoteName = useWorkspaceStore((s) => s.setNoteName);
    const [name, setName] = useState('');

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setName(noteName ?? '');
    }, [noteName]);

    return (
        <input
            type="text"
            className="note-name-input"
            placeholder="Note name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    );
}
