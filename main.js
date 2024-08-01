const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  // Ottieni le dimensioni dello schermo
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('load-streams', async () => {
  const data = fs.readFileSync(path.join(__dirname, 'streams.json'));
  return JSON.parse(data);
});

ipcMain.handle('log-error', async (event, error) => {
  console.error('Renderer Error:', error);
});