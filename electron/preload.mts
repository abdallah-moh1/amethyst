// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('Amethyst', {
    ping: () => 'pong'
});