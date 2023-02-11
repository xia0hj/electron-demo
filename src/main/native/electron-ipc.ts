import { BrowserWindow, ipcMain, ipcRenderer, dialog } from "electron";
import { DatabaseApi } from "@main/database";
import nodePath from 'node:path';
import { Exe } from "@shared/types";

const IPC_ADD = 'electron-ipc/add';
const IPC_DEVTOOLS = 'electron-ipc/devtools'

export const registerIpcEventHandlers = (mainWindow:BrowserWindow)=>{
  ipcMain.handle(IPC_ADD, async () => {
    const {canceled, filePaths} = await dialog.showOpenDialog({
      title: 'add',
      filters: [{ name: 'exe', extensions: ['exe'] }],
    });
    if(canceled || filePaths.length===0){
      return;
    }
    const path = filePaths[0];
    const exe = {
      name: nodePath.basename(path),
      path,
      description: '',
      totalDuration: 0,
    };
    return DatabaseApi.addExe(exe);
  })

  ipcMain.on(IPC_DEVTOOLS, () => mainWindow.webContents.openDevTools());
}

export const ipcEventSender = {
  addExe: ():Promise<Exe> => ipcRenderer.invoke(IPC_ADD),
  openDevtools: () => ipcRenderer.send(IPC_DEVTOOLS),
}
