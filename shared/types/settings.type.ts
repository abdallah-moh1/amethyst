export interface Settings {
    theme: {
        id: string;
        type: 'built-in' | 'custom';
    };
    autoSave: boolean;
}