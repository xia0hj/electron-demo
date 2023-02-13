import { app, BrowserWindow, shell, ipcMain } from 'electron'
import nodePath from 'node:path';
import { registerIpcEventHandlers } from '@main/electron-ipc';
import nodeFs from 'node:fs';


const DIST_ELECTRON = __dirname;
const DIST_WEB = nodePath.join(DIST_ELECTRON, '../dist-web')
let mainWindow: BrowserWindow | null = null


const createWindow = async () => {
  mainWindow = new BrowserWindow({
    title: 'main window',
    width: 1100,
    height: 700,
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
  mainWindow.webContents.openDevTools();

  // nodeFs.stat(USER_DATA_DIR, (err, stats)=>{
  //   if(err || !stats.isDirectory()){
  //     nodeFs.mkdir(USER_DATA_DIR, ()=>{
  //       loadSqlite(USER_DATA_DIR);
  //     })
  //   }
  // })

  registerIpcEventHandlers(mainWindow);


}


app.whenReady().then(createWindow);
