import { app, BrowserWindow, dialog, ipcMain } from "electron"
import nodePath from 'path'

export const IPC_OPEN_ADD_GAME_DIALOG = 'ipc/open-add-game-dialog';
export const IPC_OPEN_DEVTOOLS = 'ipc/open-devtools'
export const IPC_GET_APP_PATH = 'ipc/get-app-path'

export function registerAllIpcEventHandlers(browserWindow: BrowserWindow, ) {

  ipcMain.handle(IPC_OPEN_ADD_GAME_DIALOG, () => dialog.showOpenDialog(browserWindow, {
    title: '添加游戏',
    filters: [{ name: 'exe', extensions: ['exe'] }],
    properties: ['openFile']
  }));

  ipcMain.on(IPC_OPEN_DEVTOOLS, () => browserWindow.webContents.openDevTools());

  const appPath = app.getAppPath();
  ipcMain.on(IPC_GET_APP_PATH, (event)=>{
    event.returnValue = appPath;
  })
}
