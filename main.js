const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Create window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Read directory (fs + path)
ipcMain.handle('read-dir', (event, dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);

    return files.map(file => {
      const fullPath = path.join(dirPath, file);
      return {
        name: file,
        path: fullPath,
        isDir: fs.statSync(fullPath).isDirectory()
      };
    });
  } catch (err) {
    return { error: err.message };
  }
});

// Read file content
ipcMain.handle('read-file', (event, filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return { error: err.message };
  }
});