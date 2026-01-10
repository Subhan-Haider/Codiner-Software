import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath: string, content: string) => ipcRenderer.invoke('write-file', filePath, content),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),

  // System info
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),

  // Event listeners
  onFileOpened: (callback: (filePath: string) => void) => {
    ipcRenderer.on('file-opened', (_event, filePath) => callback(filePath));
  },
  onFileSaveRequested: (callback: (filePath: string) => void) => {
    ipcRenderer.on('file-save-requested', (_event, filePath) => callback(filePath));
  },

  // Remove listeners
  removeAllListeners: (event: string) => {
    ipcRenderer.removeAllListeners(event);
  },

  // Platform detection
  platform: process.platform,
  isMac: process.platform === 'darwin',
  isWindows: process.platform === 'win32',
  isLinux: process.platform === 'linux',
});

// Type definitions for TypeScript
declare global {
  interface Window {
    electronAPI: {
      readFile: (filePath: string) => Promise<{ success: boolean; data?: string; error?: string }>;
      writeFile: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>;
      selectDirectory: () => Promise<{ success: boolean; path?: string }>;
      getSystemInfo: () => Promise<{
        platform: string;
        arch: string;
        version: string;
        electron: string;
      }>;
      onFileOpened: (callback: (filePath: string) => void) => void;
      onFileSaveRequested: (callback: (filePath: string) => void) => void;
      removeAllListeners: (event: string) => void;
      platform: string;
      isMac: boolean;
      isWindows: boolean;
      isLinux: boolean;
    };
  }
}
