import { app, BrowserWindow, shell, ipcMain } from 'electron'
import nodePath from 'node:path';


process.env.DIST_ELECTRON = __dirname;
process.env.DIST_WEB = nodePath.join(__dirname, '../dist-web')


let mainWindow: BrowserWindow | null = null


const createWindow = async () => {
  mainWindow = new BrowserWindow({
    title: 'main window',
    webPreferences:{
      nodeIntegration: true,
    }
  });

  if(process.env.VITE_DEV_SERVER_URL){
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  }else{
    mainWindow.loadFile(nodePath.join(process.env.DIST_WEB, 'index.html'))
  }

  mainWindow.webContents.openDevTools();
}


app.whenReady().then(createWindow);