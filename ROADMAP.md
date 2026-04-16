# 💎 Amethyst Roadmap

Amethyst is a streamlined, architecture-first Markdown note-taking application. This roadmap tracks our progress from the initial shell to a stable 1.0.0 release.

## ✅ Already Released

**0.1.0 — Editor Core**

- Electron shell for cross-platform support.
- Core Markdown editor foundation.
- Resizable workspace infrastructure.

**0.2.0 — Markdown Preview**

- Live Markdown-to-HTML rendering engine.
- Edit and Preview mode toggle.

**0.3.0 — Split View**

- Side-by-side editing and previewing.
- _Note: Synchronized scrolling introduced (to be refactored in 0.9.0)._

---

## 📍 Current & Future Phases

**0.4.0 — Notebook & Tree View (Current)**

- Recursive folder scanning for local workspaces (Facets).
- Tree View navigation for note hierarchies.
- Single-note loading logic (tab-less, focused environment).
- Intelligent sorting (notebooks first, then notes alphabetically).
- _Note: Temporary removal of sync-scroll for performance refactoring._

**0.5.0 — The Command System**

- **Command Registry:** Centralized hub to register and trigger all app actions.
- **Context Menus:** Right-click support for the Sidebar and Editor.
- **Shortcut Manager:** Mapping physical keys to Command IDs.
- **Toast Notifications:** Global system for both **success** and **error** feedback.

**0.6.0 — File Safety & Advanced Operations**

- **Rename & Move:** Full support for changing file/folder paths.
- **Safe Deletion:** Command-triggered deletion with confirmation modals.
- **Facet Trash:** Moves deleted files to a local `.trash` folder within the Facet.
- **Conflict Handling:** Banner-based resolution for external file changes.
- **Debounced Autosave & Dirty State:** 2s interval with "Save on Switch" protection, plus a visual indicator for unsaved changes.

**0.7.0 — Search & Global Navigation**

- **Quick Open:** `Ctrl+P` modal to instantly jump to any file by name.
- **Command Palette:** `Ctrl+Shift+P` to search and execute any registered command.
- **Local Find & Replace:** `Ctrl+F` interface to search and modify text within the active note.
- **Global Search:** Full-text indexing across the entire Facet.
- **Breadcrumbs:** Path-based navigation trail at the top of the editor.

**0.8.0 — Outline & Status**

- **Markdown Outline:** A clickable panel showing the header structure of the active note.
- **Status Bar:** Real-time word/character counts and cursor position (Line/Col).

**0.9.0 — Workspace, Themes & Focus**

- **Theme Engine:** Logic to load JSON theme files and inject CSS variables into the UI.
- **Efficient Sync-Scroll:** Re-introduction of high-performance synchronized scrolling.
- **Focus Mode:** A dedicated mode to hide all peripheral UI for distraction-free writing.
- **Layout Recovery:** Persist sidebar width, panel states, and preview status.
- **Session Restore:** Auto-load the last active Facet and note on startup.
- **Global Settings:** Central UI for editor preferences and theme selection.

**1.0.0 — Stable Release**

- **Export Engine:** One-click export to PDF and HTML.
- **App Menu Polish:** Native window menus wired to the Command System.
- **Empty States:** Onboarding UI for empty Facets or unselected notes.
- **Keyboard Cheat-Sheet:** Quick-reference modal for all shortcuts.

---

## 🔮 Later Ideas (Post-1.0.0)

- **Image Handling:** Automatic asset management for pasted/dropped images.
- Backlinks & Graph View.
- Local-first sync options.
- Plugin system.
