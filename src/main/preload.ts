import { contextBridge } from "electron";
import path from 'node:path'
import activeWindow from "active-win";

const nativeApi = {
  async test(){
    const win = await activeWindow();
    console.log(win);
  },
}

contextBridge.exposeInMainWorld('nativeApi', nativeApi);

export type NativeApi = typeof nativeApi;

