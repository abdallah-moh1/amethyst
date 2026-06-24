import { getCurrentWindow } from '@tauri-apps/api/window';
import { GeodesManager } from './GeodesManager';
import { MainApp } from './MainApp';
import { ToastNotifications } from '@/features/toast-notifications';
import { ContextMenu } from '@/features/context-menu';

const currentWindow = getCurrentWindow();

export function AppShell() {
    return (
        <>
            {currentWindow.label === 'geodes-manager' ? <GeodesManager /> : <MainApp />}
            <ToastNotifications />
            <ContextMenu />
        </>
    );
}
