### 📄 CONTRIBUTING.md

# Contributing to Amethyst

First off, thank you for considering contributing to Amethyst! It's people like you that make it a great tool for the community.

## 🏗️ Development Status

Amethyst is currently in an **early architecture-first** development phase. This means we are prioritizing a stable foundation and clean code over a rapid feature rollout. Please check the [ROADMAP.md](./ROADMAP.md) to see our current priorities before starting on a major feature.

## 🛠️ Getting Started

### 1. Fork and Clone

Fork the repository and clone it to your local machine:

```bash
git clone [https://github.com/YOUR_USERNAME/amethyst.git](https://github.com/YOUR_USERNAME/amethyst.git)
cd amethyst
```

### 2\. Setup

Install dependencies:

```bash
npm install
```

### 3\. Create a Branch

Create a branch for your work:

```bash
git checkout -b feature/your-feature-name
# OR
git checkout -b fix/your-fix-name
```

## 📜 Development Guidelines

### Code Quality

Before submitting a Pull Request, ensure your code passes our quality checks:

```bash
npm run check
```

This script runs:

- **Linting:** Ensuring code follows our style rules.
- **Formatting:** Prettier check.
- **Type-checking:** Validating TypeScript types for both the main and renderer processes.
- **Build:** Ensuring the app compiles correctly.

### Architecture-First Principles

- **Strict Typing:** Avoid `any` at all costs. Use the `shared/` directory for types that cross the IPC boundary.
- **IPC Safety:** Do not expose sensitive Node.js APIs to the renderer. All filesystem or native actions must go through the main process via the Preload API.
- **Feature Encapsulation:** Keep React features inside `src/features/` and maintain clear separation of concerns.

## 🚀 Submitting a Pull Request

1.  **Keep it Focused:** A PR should ideally do one thing. If you want to fix three different bugs, please open three different PRs.
2.  **Update Docs:** If you are adding a feature, please update the relevant documentation or the README if necessary.
3.  **Commit Messages:** Use clear, descriptive commit messages (e.g., `feat: add toast notification for errors` or `fix: resolve tree view flickering`).
4.  **Pull Request Description:** Explain _what_ changed and _why_. If it's a UI change, a screenshot or GIF is highly appreciated.

## 🐛 Reporting Bugs

If you find a bug, please open an Issue and include:

- Your OS and Amethyst version.
- Steps to reproduce the bug.
- Expected vs. actual behavior.
- (Optional) Error logs from the Electron console.

## 💡 Suggesting Features

We love new ideas\! Please check the [ROADMAP.md](https://www.google.com/search?q=./ROADMAP.md) first to see if your idea is already planned. If not, open an Issue labeled `enhancement` to discuss it.

---

Thank you for helping make Amethyst better !
