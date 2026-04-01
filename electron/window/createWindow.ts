import { BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Amethyst",
        webPreferences: {
            preload: path.join(__dirname, '..', 'preload.mjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false
        }
    });

    const devServerUrl = process.env.ELECTRON_START_URL;

    if (devServerUrl) {
        win.loadURL(devServerUrl);
    } else {
        win.loadFile(path.join(process.cwd(), 'dist', 'index.html'));
    }
}