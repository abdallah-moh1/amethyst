// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { FacetCommands } from '@/features/commands';
import { CommandRunner } from '@/features/commands/runner';
import { useWorkspaceStore } from '@/store';
import { validateFileName } from '@/utils';
import { KeyboardEvent, useEffect, useState, useRef } from 'react';

export function NoteNameInput() {
    const noteName = useWorkspaceStore((s) => s.noteName);
    const setNoteName = useWorkspaceStore((s) => s.setNoteName);

    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const isReverting = useRef(false);

    useEffect(() => {
        if (noteName === name) return;
        setName(noteName);
        setError(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setName(newValue);

        const validation = validateFileName(newValue);
        if (!validation.isValid) {
            setError(validation.error!);
        } else {
            setError(null);
        }
    };

    const handleBlur = async () => {
        if (isReverting.current) {
            isReverting.current = false;
            setError(null);
            return;
        }

        // REFOCUS IF WRONG: If there is a validation error, force focus back
        if (error) {
            inputRef.current?.focus();
            return;
        }

        const trimmedName = name.trim();

        if (trimmedName === noteName || !trimmedName) {
            setName(noteName);
            return;
        }

        const result = await CommandRunner.execute(FacetCommands.RENAME_NOTE, null, trimmedName);

        if (result.success) {
            setNoteName(trimmedName);
        } else {
            setError(result.message);
            // Focus again if the backend rejected the name (e.g. file exists)
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Only allow blur (submit) if there's no error
            if (!error) {
                e.currentTarget.blur();
            }
        } else if (e.key === 'Escape') {
            isReverting.current = true;
            setError(null);
            setName(noteName);
            e.currentTarget.blur();
        }
    };

    return (
        <div className="note-name-container">
            <input
                ref={inputRef}
                type="text"
                className={`note-name-input ${error ? 'has-error' : ''}`}
                placeholder="Note name..."
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            {error && <div className="note-name-error-tooltip">{error}</div>}
        </div>
    );
}
