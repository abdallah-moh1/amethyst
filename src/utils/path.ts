export function getParentRelativePath(path: string): string | null {
    const parts = path.split('/');
    if (parts.length <= 1) return null;

    parts.pop();

    return parts.join('/');
}
