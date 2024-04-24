const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    startTimer: (duration) => ipcRenderer.send('start-timer', duration),
    stopTimer: () => ipcRenderer.send('stop-timer')
});