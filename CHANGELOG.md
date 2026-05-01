# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-05-01

### Added

- **Keyboard Shortcut System:** A new system to manage and use keyboard shortcuts, making navigation and editing much faster.
- **Tree Drag & Drop:** A way to rearrange and move notes inside the app.
- **Context Menus:** You can now right-click on notes, notebooks, or empty areas in the sidebar to quickly access actions like renaming or deleting.
- **Toast Notifications:** Smooth pop-up alerts now confirm your actions (like saving or moving files) and stay visible if you hover over them.
- **LaTeX Math Support:** You can now write and preview complex mathematical equations directly in your notes.
- **Rename from Header:** Changed your mind on a title? You can now rename a note by clicking its name at the very top of the editor.
- **New Welcome Note:** A helpful starter note to guide new users through the app's features.
- **Empty state:** A new feature where when no note is selected instead of showing an empty editor an empty state would display (TODO: add quick actions in it).
- **Linux Support:** Added support for the Arch Linux package manager (`pacman`).

### Improved

- **Smart Sorting:** Notes and notebooks now automatically stay organized and sorted as you create or move them.
- **Better Tables:** Large tables in the preview window now have horizontal scrollbars, so they no longer break the page layout.
- **Clean Interface:** The right-side panel is now tucked away by default to give you more room to write.
- **Reliability:** Significant improvements to how files are moved and deleted to prevent data errors.

### Fixed

- **Text Alignment:** Fixed cases where long note titles would overlap or "leak" out of their boxes.

---

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
