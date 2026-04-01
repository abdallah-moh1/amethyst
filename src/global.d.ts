export { };

declare global {
    interface Window {
        Amethyst: {
            ping: () => string;
        };
    }
}