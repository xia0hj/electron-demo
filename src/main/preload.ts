import { contextBridge } from "electron";
import path from 'node:path'

const nativeApi = {
  test(){
    console.log(path.join(__dirname, 'eeee'))
  }
}

contextBridge.exposeInMainWorld('nativeApi', nativeApi);

export type NativeApi = typeof nativeApi;

