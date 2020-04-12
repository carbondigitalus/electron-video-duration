// NPM Modules
const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

// Variables
const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
  console.log('form submit received');
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log('preparing metadata');
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
    console.log('metadata sent');
  });
});
