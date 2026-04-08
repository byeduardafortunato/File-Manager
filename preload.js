const { contextBridge, ipcRenderer } = require('electron');

// Safe communication
contextBridge.exposeInMainWorld('api', {
  readDir: (dir) => ipcRenderer.invoke('read-dir', dir),
  readFile: (file) => ipcRenderer.invoke('read-file', file)
});