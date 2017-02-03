'use strict';

const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const url = require('url');

let mainWindow; // Ensures garbage collection does not remove the window

app.on('ready', () => {
  // Creates the application window and sets its dimensions to fill the screen
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width,
    height
  });

  // Loads index.html in as the main application page
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null; // allow window to be garbage collected
  });
});