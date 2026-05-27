# Amethyst Roadmap

> [!NOTE]
> This roadmap tracks what's planned, but things shift as development progresses.
> If you want to see something added, open an issue with the `feature-request` label and describe what you have in mind!

---

## Upcoming

### 0.6.0 — File Safety & Trash

- Confirmation modal before any destructive delete
- Banner prompt when a file has been changed externally
- Current path breadcrumb at the top of the editor
- Trash UI: browse deleted items, restore them or remove them permanently, and empty the trash

### 0.7.0 — Search & State

- **Quick Open / Command Palette** (`Ctrl+P`): one modal for both
    - Searches files by name by default
    - Type `/` to search and run commands instead
- **Find & Replace** (`Ctrl+F`): better find and replace than what CodeMirror ships with by default
- **Layout persistence**: sidebar width, panel states, and the last open note are remembered on relaunch

### 0.8.0 — Images, Content & Panels

- Paste or drag and drop images directly into a note
- Images are stored automatically inside the facet directory
- The correct relative path gets inserted into the Markdown for you
- Outline panel with a clickable list of the headers in the current note
- Sidebar and outline panel can each be collapsed independently via toolbar button or keyboard shortcut
- Status bar showing word count, character count, and cursor position

### 0.9.0 — Global Search & Multi-Facet

- Full-text search across everything in the facet
- Support for multiple facets with easy switching between them
- The workspace state is saved and restored across sessions

### 0.9.5 — Polish & Focus

- Synchronized scrolling, rewritten properly this time
- Focus mode that hides all panels when you just want to write
- Settings page covering autosave interval, theme, panel defaults, and shortcuts

### 1.0.0 — Stable Release

No new features, just making sure everything that's already there actually works well.

- Bug fixes and edge case cleanup
- Startup time and large file performance
- UI consistency pass across all surfaces

---

## Post-1.0

- Export to PDF and HTML
- Backlinks and graph view
- Plugin system
