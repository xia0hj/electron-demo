import { app, BrowserWindow, shell, ipcMain } from 'electron'
import nodePath from 'node:path';
import { registerIpcEventHandlers } from './native/electron-ipc';


const DIST_ELECTRON = __dirname;
const DIST_WEB = nodePath.join(DIST_ELECTRON, '../dist-web')
let mainWindow: BrowserWindow | null = null


const createWindow = async () => {
  mainWindow = new BrowserWindow({
    title: 'main window',
    webPreferences:{
      preload: nodePath.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  });


  if(process.env.VITE_DEV_SERVER_URL){
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  }else{
    mainWindow.loadFile(nodePath.join(DIST_WEB, 'index.html'))
  }

  registerIpcEventHandlers(mainWindow);

  mainWindow.webContents.openDevTools();
}


app.whenReady().then(createWindow);