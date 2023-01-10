import { app, BrowserWindow, dialog, ipcMain, ipcRenderer } from "electron"

const IPC_OPEN_ADD_GAME_DIALOG = 'ipc/open-add-game-dialog';
const IPC_OPEN_DEVTOOLS = 'ipc/open-devtools'
const IPC_GET_APP_PATH = 'ipc/get-app-path'




export function registerAllIpcEventHandlers(browserWindow: BrowserWindow) {



  ipcMain.handle(IPC_OPEN_ADD_GAME_DIALOG, async () => {
    const result = await dialog.showOpenDialog(browserWindow, {
      title: '添加游戏',
      filters: [{ name: 'exe', extensions: ['exe'] }],
      properties: ['openFile']
    });
    return {
      ...result,
      iconUrl: 'aaa'
    };
  });

  ipcMain.on(IPC_OPEN_DEVTOOLS, () => browserWindow.webContents.openDevTools());

  const appPath = app.getAppPath();
  ipcMain.on(IPC_GET_APP_PATH, (event) => {
    event.returnValue = appPath;
  })
}

export const ipcEventSender = {
  openAddGameDialog: () => (ipcRenderer.invoke(IPC_OPEN_ADD_GAME_DIALOG) as Promise<Electron.OpenDialogReturnValue>),
  openDevtools: () => ipcRenderer.send(IPC_OPEN_DEVTOOLS),
  getAppPath: () => (ipcRenderer.sendSync(IPC_GET_APP_PATH) as string)
};

async function openAddGameDialogHandler() {

}
