// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { bootstrapApp } from './app/bootstrap';

// Global styles
import './styles/globals.css';
import './styles/layout.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

bootstrapApp().then(() => {
    console.log('App bootstrapped successfully');
});
