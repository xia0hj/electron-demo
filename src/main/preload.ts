import { contextBridge, dialog } from "electron";
import path from 'node:path'
import activeWindow from "active-win";
import { ipcEventSender } from "@main/native/electron-ipc";
import { ProcessObserver } from "@main/native/process-observer";

const NativeApi = {
  ...ipcEventSender,
  run(path:string){
    new ProcessObserver(path);
  }
}

contextBridge.exposeInMainWorld('NativeApi', NativeApi);
export type NativeApiDef = typeof NativeApi;

