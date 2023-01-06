import ElectronStore from 'electron-store';
import nodePath from 'path'

const electronStore = new ElectronStore({
  name: 'MyGame',
  fileExtension: 'json',
  cwd: nodePath.join(window.ipcEventSender.getAppPath(), 'userdata')
});

export default electronStore;