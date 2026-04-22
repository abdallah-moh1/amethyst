import { useEffect } from 'react';
import { ContextMenuState } from '.';

type Props = {
    menu: ContextMenuState;
    close: () => void;
};

export function ContextMenu({ menu, close }: Props) {
    // close on click outside
    useEffect(() => {
        if (!menu) return;

        const handleClick = () => close();
        window.addEventListener('click', handleClick);

        return () => window.removeEventListener('click', handleClick);
    }, [menu, close]);

    if (!menu) return null;

    return (
        <ul className="context-menu" style={{ top: menu.y, left: menu.x }}>
            {menu.items.map((item, i) => {
                if (item.separator) {
                    return <li key={i} className="context-menu__separator" />;
                }

                return (
                    <li
                        key={i}
                        className={`context-menu__item ${
                            item.disabled ? 'context-menu__item--disabled' : ''
                        }`}
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
