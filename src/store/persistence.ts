import ElectronStore from 'electron-store';
import nodePath from 'node:path'

const electronStore = new ElectronStore({
  name: 'MyGame',
  fileExtension: 'json',
  cwd: nodePath.join(window.ipcEventSender.getAppPath(), 'user-data')
});

export const userDataGet = function userDataGet(key:string, defaultValue?:any){
  return electronStore.get(key) ?? defaultValue;
}

export const userDataSet = function userDataSet(key:string, value:object|[]){
  electronStore.set(key, value)
}

