import { readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { isConfigPath, isMarkdownFile, normalizeRelativePath } from "../utils/path.utils.js";

export class SafeScannerService {

    constructor(private safePath: string) { }

    scan(): { notes: string[]; notebooks: string[]; } {
        const notes: string[] = [];
        const notebooks: string[] = [];

        const entries = readdirSync(this.safePath, {
            recursive: true,
            withFileTypes: true,
        });

        for (const dirent of entries) {
            const fullPath = join(dirent.parentPath, dirent.name);
            const relativePath = normalizeRelativePath(relative(this.safePath, fullPath));

            if (isConfigPath(relativePath)) {
                continue;
            }

            if (dirent.isDirectory()) {
                notebooks.push(relativePath);
            } else if (dirent.isFile() && isMarkdownFile(relativePath)) {
                notes.push(relativePath);
            }
        }

        return { notes, notebooks };
    }
}