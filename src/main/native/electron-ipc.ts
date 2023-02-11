import { BrowserWindow, ipcMain, ipcRenderer, dialog } from "electron";

const IPC_ADD = 'electron-ipc/add';
const IPC_DEVTOOLS = 'electron-ipc/devtools'

export const registerIpcEventHandlers = (mainWindow:BrowserWindow)=>{
  ipcMain.handle(IPC_ADD, async () => {
    return dialog.showOpenDialog({
      title: 'add',
      filters: [{ name: 'exe', extensions: ['exe'] }],
    })
  })

  ipcMain.on(IPC_DEVTOOLS, () => mainWindow.webContents.openDevTools());
}

export const ipcEventSender = {
  add: ():Promise<Electron.OpenDialogReturnValue> => ipcRenderer.invoke(IPC_ADD),
  openDevtools: () => ipcRenderer.send(IPC_DEVTOOLS),
}
