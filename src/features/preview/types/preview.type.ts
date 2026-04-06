export type PreviewProps = {
    content: string;
    onToggleTask?: (taskIndex: number, checked: boolean) => void;
    show?: boolean;
};
