// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useEffect } from 'react';
import { useContextMenu } from '@/shared/hooks/useContextMenu';

import './context-menu.css';

export function ContextMenu() {
    const { menu, close } = useContextMenu();

    useEffect(() => {
        if (!menu) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('click', close);
        window.addEventListener('resize', close);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('click', close);
            window.removeEventListener('resize', close);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [menu, close]);

    if (!menu) return null;

    return (
        <ul className="context-menu" style={{ top: menu.y, left: menu.x }}>
            {menu.items.map((item, i) => {
                if (item.separator) {
                    return <li key={i} className="context-menu__separator" />;
                }

                const variant = item.variant ?? 'default';

                return (
                    <li
                        key={i}
                        className={[
                            'context-menu__item',
                            `context-menu__item--${variant}`,
                            item.disabled && 'context-menu__item--disabled',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => {
                            if (!item.disabled && item.action) {
                                item.action();
                                close();
                            }
                        }}
                    >
                        <span>{item.label}</span>
                        {item.shortcut && (
                            <span className="context-menu__shortcut">{item.shortcut}</span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
