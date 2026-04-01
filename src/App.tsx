// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

export default function App() {
    return (
        <main className="app">
            <h1>Amethyst</h1>
            <p>{window.Amethyst.ping()}</p>
        </main>
    );
}