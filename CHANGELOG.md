# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-04-17

### Added

- **Single-Facet Management:** Support for a single root directory (set to a fixed default path).
- **Recursive Tree View:** Hierarchical sidebar navigation with Notebook/Note sorting.
- **Real-time Sync:** Chokidar-powered watcher to reflect external FS changes.
- **Tab-less Loading:** Architecture optimized for single-note focus.
- **Creation UI:** Sidebar header buttons for adding notes and notebooks.

### Changed

- **Sync-Scroll:** Temporarily disabled for performance refactor in v0.9.0.

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
