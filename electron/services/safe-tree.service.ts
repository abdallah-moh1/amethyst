import { NotebookMetadata, NoteMetadata } from '../../shared/types/config.type.js';
import { NotebookNode, TreeNode } from '../../shared/types/tree.type.js';

export class SafeTreeService {
    static buildTree(notebooks: NotebookMetadata[], notes: NoteMetadata[]): TreeNode[] {
        const root: TreeNode[] = [];

        const getOrCreateNotebookNode = (
            currentLevel: TreeNode[],
            name: string,
            path: string,
        ): NotebookNode => {
            let folder = currentLevel.find(
                (node): node is NotebookNode => node.type === 'notebook' && node.path === path,
            );

            if (!folder) {
                folder = {
                    type: 'notebook',
                    name,
                    path,
                    children: [],
                };
                currentLevel.push(folder);
            }

            return folder;
        };

        // 1) build all notebook folders first
        for (const notebook of notebooks) {
            const parts = notebook.path.split('/');
            let currentLevel = root;

            for (let i = 0; i < parts.length; i++) {
                const name = parts[i];
                const path = parts.slice(0, i + 1).join('/');

                const folder = getOrCreateNotebookNode(currentLevel, name, path);
                currentLevel = folder.children;
            }
        }

        // 2) place notes into root or into notebook folders
        for (const note of notes) {
            const parts = note.path.split('/');
            const noteName = parts[parts.length - 1];
            const folderParts = parts.slice(0, -1);

            let currentLevel = root;

            for (let i = 0; i < folderParts.length; i++) {
                const name = folderParts[i];
                const path = folderParts.slice(0, i + 1).join('/');

                const folder = getOrCreateNotebookNode(currentLevel, name, path);
                currentLevel = folder.children;
            }

            currentLevel.push({
                type: 'note',
                name: noteName,
                path: note.path,
                id: note.id,
            });
        }

        return root;
    }

    static sortTree(root: TreeNode[]): TreeNode[] {
        const sorted = [...root].sort((a, b) => {
            if (a.type !== b.type) {
                return a.type === 'notebook' ? -1 : 1;
            }

            return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        });

        return sorted.map((node) => {
            if (node.type === 'notebook') {
                return {
                    ...node,
                    children: this.sortTree(node.children),
                };
            }
            return node;
        });
    }
}
