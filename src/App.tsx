// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import LeftSidebar from "./components/LeftSidebar";
import Main from "./components/Main";
import RightSidebar from "./components/RightSidebar";
import { Group, Panel, Separator } from "react-resizable-panels";


export default function App() {
    return (
        <main className="app">
            <Group>
                <Panel >
                    <LeftSidebar />
                </Panel>
                <Separator />
                <Panel>
                    <Main />
                </Panel>
                <Separator />
                <Panel>
                    <RightSidebar />
                </Panel>
            </Group>
        </main>
    );
}