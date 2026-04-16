# 💎 Amethyst

![Version](https://img.shields.io/badge/version-0.4.0-blue.svg)
![License](https://img.shields.io/badge/license-AGPL--3.0-green.svg)
![Release](https://github.com/abdallah-moh1/amethyst/actions/workflows/release.yml/badge.svg)
![CI](https://github.com/abdallah-moh1/amethyst/actions/workflows/ci.yml/badge.svg)

A streamlined, architecture-first Markdown note-taking desktop application built with **Electron, React, Vite, and TypeScript**.

Amethyst is currently in active early development. The latest `v0.4.0` milestone introduces **Facets** (single-workspace management) and a recursive filesystem tree view.

## 🚀 Current Status (`v0.4.0`)

What currently works:

- **Single-Facet Workspace:** Support for opening and scanning a single local root directory.
- **Recursive Tree View:** Hierarchical navigation of folders (notebooks) and files (notes) within the active Facet.
- **Real-time Sync:** Main-process filesystem watching (Chokidar) to reflect external changes instantly.
- **Editor:** CodeMirror 6 integration with tab-less, single-note focused loading.
- **Preview:** Live Markdown-to-HTML rendering with toggle and split-view modes.
- **Theming:** Built-in dark and light theme loading via CSS variables and JSON.
- **Infrastructure:** Settings persistence and GitHub Actions CI/CD.

> **Note:** Synchronized scrolling has been temporarily removed in v0.4.0 to undergo a high-performance refactor scheduled for v0.9.0.

_See [ROADMAP.md](./ROADMAP.md) for the full release schedule and the road to 1.0.0._

## 📸 Screenshots

![Amethyst Screenshot Dark Theme](./screenshots/screenshot1.png)
![Amethyst Screenshot Light Theme](./screenshots/screenshot2.png)

## 🛠️ Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Desktop Shell | Electron                    |
| Renderer      | React                       |
| Build Tool    | Vite                        |
| Language      | TypeScript                  |
| Editor        | CodeMirror 6                |
| Layout        | react-resizable-panels      |
| Styling       | CSS variables + JSON themes |
| Packaging     | electron-builder            |

## 📂 Project Structure

```text
amethyst/
├── assets/                # Icons and packaging assets
├── electron/              # Electron main process, preload, IPC, native-side services
│   ├── ipc/               # IPC handler registration
│   ├── services/          # Settings/theme/filesystem services
│   ├── themes/            # Built-in JSON theme definitions
│   └── window/            # BrowserWindow creation
├── shared/                # Types shared by main and renderer
├── src/                   # React renderer application
│   ├── app/               # App bootstrap and root app component
│   ├── features/          # Feature modules (editor, sidebar/tree, workspace)
│   ├── layout/            # App shell and panel layout composition
│   ├── services/          # Renderer-side IPC client wrappers
│   └── styles/            # Global and layout CSS
├── .github/workflows/     # CI and release automation
├── package.json
└── vite.config.ts
```

## 🏗️ Architecture

Amethyst follows a strict, secure Electron architecture:

- **Main Process:** Manages native windows, recursive filesystem scanning, and file watching.
- **Preload:** Exposes a narrow, secure API to the renderer through `window.amethyst`.
- **Renderer:** Contains the React UI and communicates via IPC wrappers.
- **Shared Types:** Keeps the contract between the main process and renderer strictly aligned.

_For more detail, see [ARCHITECTURE.md](https://www.google.com/search?q=./ARCHITECTURE.md)._

## 💻 Development

### 1\. Install Dependencies

```bash
npm install
```

### 2\. Run Locally

```bash
npm run dev
```

### 3\. Run Checks

```bash
npm run check
```

## 📦 Build and Package

| Command                  | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `npm run build`          | Builds the renderer and Electron TypeScript output. |
| `npm run build:electron` | Packages the app into desktop release artifacts.    |

**Packaging Targets:** Windows (NSIS, Portable), macOS (DMG, ZIP), Linux (AppImage, DEB, RPM).

## 🎨 Themes

Amethyst utilizes a lightweight theme system. Themes are defined as JSON files in `electron/themes/` and applied in the renderer by mapping theme tokens to CSS custom properties.

## 📚 Documentation

- [ROADMAP.md](https://www.google.com/search?q=./ROADMAP.md) - Release schedule.
- [PROJECT_PLAN.md](https://www.google.com/search?q=./PROJECT_PLAN.md) - Technical milestone checklist.
- [ARCHITECTURE.md](https://www.google.com/search?q=./ARCHITECTURE.md) - Technical deep dive.

## 🤝 Contributing

Please see [CONTRIBUTING.md](https://www.google.com/search?q=./CONTRIBUTING.md) for guidelines.

## 👨‍💻 Author

**Abdallah Mohammad**

- GitHub: [abdallah-moh1](https://www.google.com/search?q=https://github.com/abdallah-moh1)
- Email: `abdallah.moh.q@gmail.com`

## 📄 License

Amethyst is licensed under the **AGPL-3.0-or-later** license.
