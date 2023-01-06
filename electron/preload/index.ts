import { ipcRenderer } from "electron";
import { IPC_GET_APP_PATH, IPC_OPEN_ADD_GAME_DIALOG, IPC_OPEN_DEVTOOLS } from '../main/IpcEventManager'

export const ipcEventSender = {
  openAddGameDialog: () => (ipcRenderer.invoke(IPC_OPEN_ADD_GAME_DIALOG) as Promise<Electron.OpenDialogReturnValue>),
  openDevtools: () => ipcRenderer.send(IPC_OPEN_DEVTOOLS),
  getAppPath: () => (ipcRenderer.sendSync(IPC_GET_APP_PATH) as string)
};
(window as any).ipcEventSender = ipcEventSender;


