import { contextBridge, dialog } from "electron";
import path from 'node:path'
import activeWindow from "active-win";
import { ipcEventSender } from "@main/native/electron-ipc";
import { ProcessObserver } from "@main/native/process-observer";
import { Exe } from "@shared/types";

const NativeApi = {
  ...ipcEventSender,
  run(exe:Exe){
    new ProcessObserver(exe);
  }
}

contextBridge.exposeInMainWorld('NativeApi', NativeApi);
export type NativeApiDef = typeof NativeApi;

