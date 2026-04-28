// SPDX-License-Identifier: AGPL-3.0-or-later
// Amethyst - A modern markdown note-taking application
// Copyright (C) 2026 Abdallah

import { BrowserWindow } from 'electron';
import { FacetNote, FacetNotebook } from '../../../shared/types/facet.type.js';
import {
    getNameFromPath,
    getParentRelativePath,
    isHiddenPath,
    isMarkdownFile,
    toRelativeFacetPath,
} from '../../utils/path.utils.js';
import { FacetScanService } from './facet-scan.service.js';
import chokidar, { FSWatcher } from 'chokidar';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import matter from 'gray-matter';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export class FacetService {
    private notes: Map<string, FacetNote>;
    private notebooks: Map<string, FacetNotebook>;
    private watcher: FSWatcher | null = null;

    constructor(
        private facetPath: string,
        private win: BrowserWindow,
    ) {
        this.notes = new Map();
        this.notebooks = new Map();
    }

    async openFacet(): Promise<{
        notes: FacetNote[];
        notebooks: FacetNotebook[];
    }> {
        if (this.watcher) {
            await this.watcher.close();
            this.watcher = null;
        }

        // Create facet if it doesn't exist
        if (!existsSync(this.facetPath)) {
            await mkdir(this.facetPath, { recursive: true });
            await writeFile(join(this.facetPath, "Welcome.md"), WELCOME_NOTE, "utf-8");
        }

        await FacetScanService.scanDisk(this.facetPath, this);

        this.watcher = chokidar.watch(this.facetPath, {
            persistent: true,
            ignored: (path, stats) => {
                if (!stats) return false; // not yet known, don't ignore
                if (stats.isDirectory() && !isHiddenPath(toRelativeFacetPath(this.facetPath, path)))
                    return false;
                return !isMarkdownFile(path);
            },
            awaitWriteFinish: {
                stabilityThreshold: 300,
                pollInterval: 50,
            },
            ignoreInitial: true,
            atomic: true,
        });

        this.watcher.on('add', async (absolutePath) => {
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            if ([...this.notes.values()].find((n) => n.path === relativePath)) return;

            const [frontMatter, fileStat] = await Promise.all([
                FacetScanService.readFrontmatter(absolutePath),
                stat(absolutePath),
            ]);
            const note: FacetNote = {
                id: frontMatter?.id ?? randomUUID(),
                name: getNameFromPath(relativePath),
                path: relativePath,
                parentPath: getParentRelativePath(relativePath),
                createdAt: fileStat.birthtime,
                modifiedAt: fileStat.mtime,
            };
            await FacetScanService.handleDuplicateId(this.facetPath, this, note, absolutePath);

            if (!frontMatter) {
                const content = await readFile(absolutePath, { encoding: 'utf-8' });

                const parsed = matter(content);
                await writeFile(absolutePath, matter.stringify(parsed.content, { id: note.id }));
            }

            this.addNote(note);
            this.push('facet:note-added', note);
        });

        this.watcher.on('unlink', (absolutePath) => {
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            const note = [...this.notes.values()].find((n) => n.path === relativePath);
            if (!note) return;
            this.removeNote(note.id);
            this.push('facet:note-removed', note.id);
        });

        this.watcher.on('change', async (absolutePath) => {
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            const note = [...this.notes.values()].find((n) => n.path === relativePath);
            if (!note) return;
            const fileStat = await stat(absolutePath);
            const updated = { ...note, modifiedAt: fileStat.mtime };
            this.addNote(updated);
            this.push('facet:note-changed', updated);
        });

        this.watcher.on('addDir', (absolutePath) => {
            if (absolutePath === this.facetPath) return; // ignore root
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            const notebook: FacetNotebook = {
                name: getNameFromPath(relativePath),
                path: relativePath,
                parentPath: getParentRelativePath(relativePath),
            };
            this.addNotebook(notebook);
            this.push('facet:notebook-added', notebook);
        });

        this.watcher.on('unlinkDir', (absolutePath) => {
            if (absolutePath === this.facetPath) return;
            const relativePath = toRelativeFacetPath(this.facetPath, absolutePath);
            this.removeNotebook(relativePath);
            this.push('facet:notebook-removed', relativePath);
        });

        return {
            notes: [...this.notes.values()],
            notebooks: [...this.notebooks.values()],
        };
    }

    private push(channel: string, data: unknown) {
        if (!this.win.isDestroyed()) {
            this.win.webContents.send(channel, data);
        }
    }

    async closeFacet(): Promise<void> {
        if (!this.watcher) return;

        await this.watcher.close();
    }

    getFacetPath(): string {
        return this.facetPath;
    }

    getNotes(): ReadonlyMap<string, FacetNote> {
        return this.notes;
    }

    getNotebooks(): ReadonlyMap<string, FacetNotebook> {
        return this.notebooks;
    }

    addNotebook(notebook: FacetNotebook) {
        this.notebooks.set(notebook.path, notebook);
    }

    getNotebook(path: string) {
        return this.notebooks.get(path);
    }

    removeNotebook(path: string) {
        this.notebooks.delete(path);
    }

    addNote(note: FacetNote) {
        this.notes.set(note.id, note);
    }

    getNote(id: string) {
        return this.notes.get(id);
    }

    removeNote(id: string) {
        this.notes.delete(id);
    }
}

const WELCOME_NOTE = `<div style="text-align: center;">
<svg width="120" viewBox="0 0 86 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.49133 40.1671L9.97437 30.51L11.8759 36.4205L8.9667 47.1277L5.49133 40.1671Z" fill="#4A0F80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8759 36.4205L9.97437 30.51L17.9399 39.4955L11.8759 36.4205Z" fill="#BF80E8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.9667 47.1277L11.8759 36.4205L17.9399 39.4955L25.0839 66.101L25.3411 70.522L8.9667 47.1277Z" fill="#9954CB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.9667 47.1277L25.3411 70.522L17.7288 68.9479L8.9667 47.1277Z" fill="#4A0F80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.49133 40.1671L8.9667 47.1277L17.7288 68.9479L6.76048 52.5485L5.49133 40.1671Z" fill="#39015F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M80.2694 40.1671L75.7864 30.51L73.8849 36.4205L76.794 47.1277L80.2694 40.1671Z" fill="#4A0F80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M73.8849 36.4205L75.7864 30.51L67.8209 39.4955L73.8849 36.4205Z" fill="#BF80E8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M76.794 47.1277L73.8849 36.4205L67.8209 39.4955L60.6769 66.101L60.4197 70.522L76.794 47.1277Z" fill="#9954CB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M76.794 47.1277L60.4197 70.522L68.0319 68.9479L76.794 47.1277Z" fill="#4A0F80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M80.2694 40.1671L76.794 47.1277L68.0319 68.9479L79.0003 52.5485L80.2694 40.1671Z" fill="#39015F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M33.7937 22.3585L43.0974 9.28494L52.9277 22.3585L43.6211 62.2188L33.7937 22.3585Z" fill="#9954CB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.5469 11.0039L43.082 0L54.1562 11.0078L52.9277 22.3585L43.0974 9.28494L33.7937 22.3585L32.5038 11.1715L32.5469 11.0039Z" fill="#4A0F80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28 28.6836L32.5038 11.1715L33.7937 22.3585L34.8047 56.7734L28 28.6836Z" fill="#39015F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.6211 62.2188L34.8047 56.7734L33.7937 22.3585L43.6211 62.2188Z" fill="#4A0F80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M51.8906 56.7773L43.6211 62.2188L52.9277 22.3585L51.8906 56.7773Z" fill="#4A0F80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M58.6797 28.707L51.8906 56.7773L52.9277 22.3585L54.1562 11.0078L58.6797 28.707Z" fill="#39015F"/>
</svg>
</div>

<h1 style="text-align: center;">Welcome to Amethyst</h1>

#### Welcome—I'm glad you're here.

Amethyst is still a work in progress. You may notice things changing, features evolving, or the occasional rough edge along the way.

> If you run into any issues or bugs, you can report them here:
https://github.com/abdallah-moh1/amethyst/issues

Thanks for being part of it early.`;