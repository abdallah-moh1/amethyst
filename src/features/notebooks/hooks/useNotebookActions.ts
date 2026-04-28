import { useInteractionStore } from '@/store';

import {
    createNotebook,
    deleteNotebook,
    moveNotebook,
    renameNotebook,
} from '../commands/wrappers';
import { CommandExecutionResult } from '@/shared/types/command.type';

export function useNotebookActions() {
    const toast = useInteractionStore.getState().addToast;

    const handle = async <T extends unknown[]>(
        fn: (...args: T) => Promise<CommandExecutionResult>,
        args: T,
    ) => {
        const result = await fn(...args);

        if (!result.success) {
            toast({
                id: crypto.randomUUID(),
                message: result.message,
                type: 'error',
                duration: 4000,
            });
        }

        return result;
    };

    return {
        create: (...args: Parameters<typeof createNotebook>) =>
            handle(createNotebook, args),

        remove: (...args: Parameters<typeof deleteNotebook>) =>
            handle(deleteNotebook, args),

        move: (...args: Parameters<typeof moveNotebook>) =>
            handle(moveNotebook, args),

        rename: (...args: Parameters<typeof renameNotebook>) =>
            handle(renameNotebook, args),
    };
}