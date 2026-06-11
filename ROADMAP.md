# Amethyst Roadmap

> [!NOTE]
> This roadmap tracks what's planned, but things will definitely shift as development moves forward.
> If you want to see something added, just open an issue with the `feature-request` label and drop a description of what you have in mind!

---

## Upcoming

### 0.6.0: The Core Rust Rewrite

- Engine Shift: Swapping over to Tauri to get a lightweight, native, and high-performance framework.
- Geodes (Vaults): Notes are organized into self-contained directories, strictly enforcing one Geode per window.
- Geodes Manager Window: A central hub that launches in a separate window so you can open, create, or open a folder as a Geode.
- Performance: A complete ground-up rewrite of the Markdown Renderer.

### 0.7.0: Command Palette, Navigation and Sync

- Context-Aware Quick Open and Command Palette (`Ctrl+P`): Features dynamic syntax modes (`>` for commands) and context-aware actions.
- Breadcrumbs: Current file path breadcrumbs displayed right at the top of the editor.
- File Sync Awareness: Immediate banner prompt if a file gets modified externally.

### 0.8.0: Images, Content and Panels

- Localized Asset Management: Drag and drop, clipboard paste, or a simple "Upload Image" UI option to pull in images. Everything saves locally to the note's folder.
- Syntax Rules: Local images use internal wiki-links (`![[image.png]]`), while web links use standard Markdown (`![](url)`).
- Workspace UI and Navigation: Clickable Outline Panel for quick header navigation, plus independent panel collapsing via shortcuts or buttons.
- Layout Persistence: The app automatically remembers and restores the layout state (sidebar width, panel visibility, and the last open note) on relaunch.

### 0.9.0: File Safety and Editor Tools

- Find and Replace (`Ctrl+F`): Customize CodeMirror's Find and Replace UI.
- Geode-Local Trash System:
    - Confirmation modals before doing anything destructive.
    - Dedicated UI to browse, restore, or permanently purge trash.

### 0.10.0: View Tools and Configuration

- Centralized Settings Page: Still in the thinking process.
- Synchronized Scrolling: Real-time scroll synchronization between the Markdown source code and the live preview.
- Document Export Options: Export the active note locally into clean standalone HTML or print-ready PDF layouts.

### 1.0.0: Stable Release

- Stabilization and Polish: Exhaustive bug fixes, edge-case cleanup, and crash-resilience tracking.
- Performance Optimization: Heavy focus on ultra-fast startup times and fluid rendering performance when loading massive Markdown files.
- Visual Polish: A meticulous UI/UX consistency pass across all app windows, modals, and panel transitions.
