import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('Amethyst', {
    ping: () => 'pong'
});