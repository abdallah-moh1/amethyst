// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import '../styles/geodes-list.css';

import { Geode } from '@/shared/types/geode.type';
import { EllipsisIcon } from 'lucide-react';
import { getCurrentWindow } from '@tauri-apps/api/window';
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
    return (
        <button
            className="geode-list-item"
            onClick={() => {
                WindowsClient.openGeodeMainWindow({
                    id: geode.id,
                });

                getCurrentWindow().close();
            }}
        >
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
        </button>
    );
}

type GeodesListProps = {
    geodes: Geode[];
};

type GeodeListItemProps = {
    geode: Geode;
};
