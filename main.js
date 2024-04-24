const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
require('electron-reload')(__dirname);
const path = require('path'); 
const { exec } = require('child_process');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false
    },
    resizable: false
  })
  win.removeMenu();
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
});

ipcMain.on('start-timer', (event, duration) => {
  console.log("Recibido 'start-timer' con duración: ", duration);
  modifyHostsFile();
  console.log("Temporizador iniciado, archivo hosts modificado.");

  setTimeout(() => {
      restoreHostsFile();
      console.log("Temporizador terminado, archivo hosts restaurado.");
  }, duration);
});

ipcMain.on('stop-timer', () => {
  console.log("Evento 'stop-timer' recibido en el backend."); // Verifica que esto se imprima
  restoreHostsFile();
  console.log("Archivo hosts restaurado después de detener el temporizador.");
});

const socialMediaHosts = `
127.0.0.1    www.facebook.com
127.0.0.1    facebook.com
127.0.0.1    www.twitter.com
127.0.0.1    twitter.com
127.0.0.1    www.instagram.com
127.0.0.1    instagram.com
127.0.0.1    www.snapchat.com
127.0.0.1    snapchat.com
127.0.0.1    www.tiktok.com
127.0.0.1    tiktok.com
127.0.0.1    www.pinterest.com
127.0.0.1    pinterest.com
127.0.0.1    www.reddit.com
127.0.0.1    reddit.com
127.0.0.1    www.tumblr.com
127.0.0.1    tumblr.com
127.0.0.1    www.whatsapp.com
127.0.0.1    whatsapp.com
`;

function modifyHostsFile() {
  const pathToHosts = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
  const content = fs.readFileSync(pathToHosts, 'utf8');
  const modifiedContent = content + socialMediaHosts;
  fs.writeFileSync(pathToHosts, modifiedContent, 'utf8');
}

function restoreHostsFile() {
    const pathToHosts = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
    const content = fs.readFileSync(pathToHosts, 'utf8');
    const restoredContent = content.replace(socialMediaHosts, '');
    fs.writeFileSync(pathToHosts, restoredContent, 'utf8');
}

