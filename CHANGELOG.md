# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog and the project follows semantic versioning.

## [0.3.0] - 2026-04-08

### Added

- Split editor/preview mode
- Synced scrolling between the editor and preview

---

## [0.2.0] - 2026-04-07

### Added

- Preview Mode to render the Markdown code
- Toggle between editor and preview modes
- Added groundwork for upcoming note title bar

---

## [0.1.0] - 2026-04-05

### Added

- Initial Electron desktop application shell
- React + Vite renderer setup
- CodeMirror-based editor integration
- Three-panel workspace layout with resizable panels
- Collapsible left and right side panels
- Preload bridge exposed through `window.amethyst`
- IPC handlers and services for settings and themes
- Built-in dark and light JSON themes
- Settings persistence in Electron `userData`
- GitHub Actions CI workflow
- Tagged multi-platform release workflow with electron-builder

### Known Limitations

- This release is an editor-foundation milestone.
- Notes, notebooks, preview, split view, search, and full settings UI are not implemented yet.
