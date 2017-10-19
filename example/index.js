var { app, BrowserWindow } = require('electron');
var path = require('path');

require('..')();

var mainWindow;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));
  mainWindow.on('close', function() {
    mainWindow = null;
  });
});
