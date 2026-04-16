# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-04-17

### Added

- **Facets (Single-Workspace Management):** Support for opening and scanning a single local root directory.
- **Recursive Tree View:** Hierarchical sidebar navigation for notes and notebooks within the active Facet.
- **Real-time Filesystem Sync:** Integration with `chokidar` in the Main process to reflect external file changes (add/remove) instantly.
- **Intelligent Sorting:** Automated logic that prioritizes Notebooks (folders) over Notes (files), followed by alphabetical ordering.
- **Single-Note Loading:** Tab-less editor architecture optimized for focused, single-file performance.
- **Workspace Actions:** "Add Note" and "Add Notebook" global actions within the sidebar header.
- **Empty States:** Onboarding UI for unselected folders and empty note views.

### Changed

- **Performance Refactor:** Temporarily disabled synchronized scrolling (introduced in v0.3.0) to prepare for a high-performance refactor in a later milestone.
- **IPC Architecture:** Migrated filesystem state management to a centralized IPC-driven flow between Main and Renderer.

---

## [0.3.0] - 2026-04-08

### Added

- Split editor/preview mode.
- Synced scrolling between the editor and preview.

---

## [0.2.0] - 2026-04-07

### Added

- Preview Mode to render Markdown code as HTML.
- Toggle between editor and preview modes.
- Initial groundwork for the upcoming note title bar.

---

## [0.1.0] - 2026-04-05

### Added

- Initial Electron desktop application shell.
- React + Vite renderer setup.
- CodeMirror 6 editor integration.
- Three-panel workspace layout with resizable and collapsible panels.
- Preload bridge exposed through `window.amethyst`.
- IPC handlers for settings and built-in theme services.
- Initial dark and light JSON theme definitions.
- Settings persistence in Electron `userData`.
- GitHub Actions CI/CD and multi-platform release workflows.
