
import { useExplorerStore } from '@/store/explorer.store';

export function useCreateNoteOrNotebook() {
    const setPendingCreation = useExplorerStore((s) => s.setPendingCreation);

    return [
        (parentPath: string | null = null) => {
            setPendingCreation({ type: 'note', parentPath });
        },
        (parentPath: string | null = null) => {
            setPendingCreation({ type: 'notebook', parentPath });
        }
    ];
}