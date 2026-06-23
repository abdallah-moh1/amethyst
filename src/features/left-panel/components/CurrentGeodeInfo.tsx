import { WindowsClient } from '@/infrastructure/clients/windows.client';
import { Geode } from '@/shared/types/geode.type';
import { VaultIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CurrentGeodeInfo() {
    const [currentGeode, setCurrentGeode] = useState<Geode>();

    useEffect(() => {
        WindowsClient.getGeodeForCurrentWindow().then((v) => {
            setCurrentGeode(v);
        });
    }, []);

    async function handleOpenGeodesManagerBtnClick() {
        await WindowsClient.openGeodesManagerWindow();
    }

    return (
        <div className="current-geode-info">
            <div className="geode-details">
                <p className="geode-name">{currentGeode?.name}</p>
                <p className="geode-path">{currentGeode?.path}</p>
            </div>

            <button
                className="open-geodes-manager-btn"
                title="Open Geodes Manager"
                onClick={handleOpenGeodesManagerBtnClick}
            >
                <VaultIcon />
            </button>
        </div>
    );
}
