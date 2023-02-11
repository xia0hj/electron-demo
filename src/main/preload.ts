import { contextBridge, dialog } from "electron";
import path from 'node:path'
import activeWindow from "active-win";
import { ipcEventSender } from "@main/native/electron-ipc";
import { ProcessObserver } from "@main/native/process-observer";

const nativeApi = {
  ...ipcEventSender,
  run(path:string){
    new ProcessObserver(path);
  }
}

contextBridge.exposeInMainWorld('nativeApi', nativeApi);
export type NativeApi = typeof nativeApi;

