// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import './styles/geodes-manager-content.css';

import { useEffect, useState } from 'react';
import { GeodesActionBtns } from './components/GeodesActionBtns';
import { GeodesEmptyState } from './components/GeodesEmptyState';
import { Geode } from '@/shared/types/geode.type';
import { GeodesManagerClient } from '@/infrastructure/clients/geodes-manager.client';
import { GeodesList } from './components/GeodesList';

export function GeodesManagerContent() {
    const [geodes, setGeodes] = useState<Geode[]>([]);
    const [areGeodesLoaded, setGeodeLoaded] = useState(false);

    useEffect(() => {
        GeodesManagerClient.listGeodes().then((value) => {
            setGeodes(value);
            setGeodeLoaded(true);
        });
    }, []);

    return (
        <div className="geodes-manager-content">
            <div className="geodes-panel">
                <p className="panel-title" data-tauri-drag-region>
                    My Geodes
                </p>
                {areGeodesLoaded &&
                    (geodes.length > 0 ? <GeodesList geodes={geodes} /> : <GeodesEmptyState />)}
            </div>
            <GeodesActionBtns />
        </div>
    );
}
