// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { useEffect, useRef } from 'react';
import { useContextMenu } from '@/shared/hooks/useContextMenu';

import './context-menu.css';

export function ContextMenu() {
    const { menu, close } = useContextMenu();
    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!menu) return;
        const handlePointerDown = (e: MouseEvent) => {
            if (!menuRef.current) return;

            if (!menuRef.current.contains(e.target as Node)) {
                close();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };

        window.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('blur', close);
        window.addEventListener('resize', close);

        return () => {
            window.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('blur', close);
            window.removeEventListener('resize', close);
        };
    }, [menu, close]);

    if (!menu) return null;

    return (
        <ul className="context-menu" style={{ top: menu.y, left: menu.x }} ref={menuRef}>
            {menu.items.map((item, i) => {
                if (item.separator) {
                    return <li key={i} className="context-menu__separator" />;
                }

                const variant = item.variant ?? 'default';

                return (
                    <li
                        key={item.label}
                        className={[
                            'context-menu__item',
                            `context-menu__item--${variant}`,
                            item.disabled && 'context-menu__item--disabled',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        onClick={(e) => {
                            e.preventDefault();
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
