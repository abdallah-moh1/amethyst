import { useInteractionStore } from '@/store';

import { createNotebook, deleteNotebook, moveNotebook, renameNotebook } from '../commands/actions';
import {
    CommandExecutionResult,
    CreateNotebookArgs,
    DeleteNotebookArgs,
    MoveNotebookArgs,
    RenameNotebookArgs,
} from '@/shared/types/command.type';

export function useNotebookActions() {

    const handle = async <T>(fn: (args: T) => Promise<CommandExecutionResult>, args: T) => {
        const result = await fn(args);

        if (!result.success) {
            useInteractionStore.getState().addToast({
                id: crypto.randomUUID(),
                message: result.message,
                type: 'error',
                duration: 4000,
            });
        }

        return result;
    };

    return {
        create: (args: CreateNotebookArgs) => handle(createNotebook, args),

        remove: (args: DeleteNotebookArgs) => handle(deleteNotebook, args),

        move: (args: MoveNotebookArgs) => handle(moveNotebook, args),

        rename: (args: RenameNotebookArgs) => handle(renameNotebook, args),
    };
}
