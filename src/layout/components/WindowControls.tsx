import { useEffect, useState } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { platform } from '@tauri-apps/plugin-os';

import '../styles/window-controls.css';

type WindowControlsProps = {
    hideClose?: boolean;
    hideToggleMaximize?: boolean;
    hideMinimize?: boolean;
};

const appWindow = getCurrentWindow();

function MinimizeIcon() {
    return (
        <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 6.5h8" />
        </svg>
    );
}

function MaximizeIcon() {
    return (
        <svg viewBox="0 0 12 12" aria-hidden="true">
            <rect x="2.5" y="2.5" width="7" height="7" rx="0.6" />
        </svg>
    );
}

function RestoreIcon() {
    return (
        <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M4 2.5h5.5v5.5" />
            <rect x="2.5" y="4" width="5.5" height="5.5" rx="0.6" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 3l6 6M9 3L3 9" />
        </svg>
    );
}

export function WindowControls({
    hideClose,
    hideMinimize,
    hideToggleMaximize,
}: WindowControlsProps) {
    const currentPlatform = platform();
    const variant =
        currentPlatform === 'windows' ? 'windows' : currentPlatform === 'linux' ? 'linux' : null;

    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        if (!variant) return;

        let unlisten: (() => void) | undefined;
        let mounted = true;

        const syncMaximizedState = async () => {
            try {
                const maximized = await appWindow.isMaximized();
                if (mounted) setIsMaximized(maximized);
            } catch {
                // Ignore; window APIs are unavailable outside Tauri runtime.
            }
        };

        void syncMaximizedState();

        void appWindow
            .onResized(() => {
                void syncMaximizedState();
            })
            .then((fn) => {
                unlisten = fn;
            });

        return () => {
            mounted = false;
            unlisten?.();
        };
    }, [variant]);

    if (!variant) return null;

    const minimize = () => void appWindow.minimize();

    const toggleMaximize = async () => {
        await appWindow.toggleMaximize();
        setIsMaximized(await appWindow.isMaximized());
    };

    const close = () => void appWindow.close();

    return (
        <div
            className={`window-controls window-controls--${variant}`}
            role="group"
            aria-label="Window controls"
        >
            {hideMinimize !== true && (
                <button
                    type="button"
                    className="window-control window-control--minimize"
                    aria-label="Minimize"
                    title="Minimize"
                    onClick={minimize}
                >
                    <MinimizeIcon />
                </button>
            )}

            {hideToggleMaximize !== true && (
                <button
                    type="button"
                    className="window-control window-control--maximize"
                    aria-label={isMaximized ? 'Restore' : 'Maximize'}
                    title={isMaximized ? 'Restore' : 'Maximize'}
                    onClick={toggleMaximize}
                >
                    {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
                </button>
            )}

            {hideClose !== true && (
                <button
                    type="button"
                    className="window-control window-control--close"
                    aria-label="Close"
                    title="Close"
                    onClick={close}
                >
                    <CloseIcon />
                </button>
            )}
        </div>
    );
}
