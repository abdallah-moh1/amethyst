// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import '../styles/geodes-list.css';

import { Geode } from '@/shared/types/geode.type';
import { EllipsisIcon } from 'lucide-react';
import { WindowsClient } from '@/infrastructure/clients/windows.client';

export function GeodesList({ geodes }: GeodesListProps) {
    return (
        <div className="geodes-list">
            {geodes.map((geode) => (
                <GeodeListItem geode={geode} key={geode.id} />
            ))}
        </div>
    );
}

function GeodeListItem({ geode }: GeodeListItemProps) {
    async function handleGeodeItemClick() {
        await WindowsClient.openGeodeMainWindowAndCloseCurrent({
            id: geode.id,
        });
    }
    return (
        <div className="geode-list-item" onClick={handleGeodeItemClick}>
            <div className="geode-details">
                <p className="geode-name">{geode.name}</p>
                <p className="geode-path">{geode.path}</p>
            </div>
            <button
                className="geode-options-btn"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <EllipsisIcon />
            </button>
        </div>
    );
}

type GeodesListProps = {
    geodes: Geode[];
};

type GeodeListItemProps = {
    geode: Geode;
};
