import { contextBridge, dialog } from "electron";
import path from 'node:path'
import activeWindow from "active-win";
import { ipcEventSender } from "./native/electron-ipc";

const nativeApi = {
  ...ipcEventSender,
  run(path:string){
    console.log('run: ',path)
  }
}

contextBridge.exposeInMainWorld('nativeApi', nativeApi);
export type NativeApi = typeof nativeApi;

