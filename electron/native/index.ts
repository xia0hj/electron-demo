import { BrowserWindow, dialog, ipcMain, ipcRenderer } from "electron"
import { testFFI } from "./win32";


const IPC_ADD = 'electron-ipc/add';
const IPC_DEVTOOLS = 'electron-ipc/devtools'

let mainWindow: BrowserWindow;

export const setupElectronApi = (browserWindow: BrowserWindow) => {
  mainWindow = browserWindow;
  registerIpcEventHandlers();
}

const registerIpcEventHandlers = () => {
  ipcMain.handle(IPC_ADD, async () => {
    return dialog.showOpenDialog({
      title: 'add',
      filters: [{ name: 'exe', extensions: ['exe'] }],
    })
  })

  ipcMain.on(IPC_DEVTOOLS, () => mainWindow.webContents.openDevTools());
}

export const nativeApi = {
  add: ():Promise<Electron.OpenDialogReturnValue> => ipcRenderer.invoke(IPC_ADD),
  openDevtools: () => ipcRenderer.send(IPC_DEVTOOLS),
  testFFI: () => testFFI()
}

export type NativeApi = typeof nativeApi;
