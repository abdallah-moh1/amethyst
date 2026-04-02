// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { Panel, Group, Separator } from "react-resizable-panels";

export function WorkspacePanels() {
  return (
    <Group className="panel-group">
      <Panel
        className="sidebar-panel"
        defaultSize={200}
        minSize={14}
        collapsible
        collapsedSize={20}
      >
        Sidebar panel
      </Panel>

      <Separator className="separator" />

      <Panel className="workspace-panel" defaultSize={200} minSize={40}>
        workspace panel
      </Panel>

      <Separator className="separator" />

      <Panel className="right-panel" defaultSize={200} minSize={15} collapsible>
        rightpanel
      </Panel>
    </Group>
  );
}
