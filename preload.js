const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadStreams: () => ipcRenderer.invoke('load-streams'),
  logError: (error) => ipcRenderer.invoke('log-error', error)
});