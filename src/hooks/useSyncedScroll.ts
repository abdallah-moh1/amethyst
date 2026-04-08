import { WorkspaceStore } from '@/types/stores.type';
import { SyncedScroll } from '@/types/workspace.type';
import { useRef } from 'react';

export function useSyncedScroll(setSyncedScroll: WorkspaceStore["setSyncedScroll"]) {
    const isSyncing = useRef(false);
    const ticking = useRef(false);

    const handleScroll = (element: HTMLElement, source: SyncedScroll["source"]) => {
        if (isSyncing.current || ticking.current) return;

        ticking.current = true;

        requestAnimationFrame(() => {
            const maxScroll =
                element.scrollHeight - element.clientHeight;

            const percentage =
                maxScroll > 0 ? element.scrollTop / maxScroll : 0;

            setSyncedScroll({
                source,
                percentage,
            });

            ticking.current = false;
        });
    };

    const applyScroll = (element: HTMLElement | null, percentage: number) => {
        if (!element) return;

        isSyncing.current = true;

        const maxScroll =
            element.scrollHeight - element.clientHeight;

        element.scrollTop = maxScroll * percentage;

        requestAnimationFrame(() => {
            isSyncing.current = false;
        });
    };

    return { handleScroll, applyScroll };
}