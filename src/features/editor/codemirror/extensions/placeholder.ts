import { placeholder as cmPlaceholder } from '@codemirror/view';

export function placeholderExtension(text?: string) {
    return text ? [cmPlaceholder(text)] : [];
}
