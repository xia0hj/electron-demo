import { contextBridge, dialog } from "electron";
import path from 'node:path'
import activeWindow from "active-win";
import { ipcEventSender } from "@main/electron-ipc";
import { ProcessObserver } from "@main/process-observer";
import { App } from "@shared/types";

const NativeApi = {
  ...ipcEventSender,
  run(app:App){
    new ProcessObserver(app);
  }
}

contextBridge.exposeInMainWorld('NativeApi', NativeApi);
export type NativeApiDef = typeof NativeApi;

