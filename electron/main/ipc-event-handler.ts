import { ipcMain, dialog } from "electron";
import { IPC_EVENT_OPEN_IMPORT_DIALOG } from "@shared/constants";
import nodeChildProcess from 'child_process'
import nodeFs from 'fs'

export function registerAllIpcEventHandlers() {
  ipcMain.on(IPC_EVENT_OPEN_IMPORT_DIALOG, ()=>{
    dialog.showOpenDialog({
      title: '导入文件'
    }).then(file=>{
      if(file.filePaths.length===0){
        return;
      }
      const startTime = Date.now()
      const path = '"' + file.filePaths[0] + '"'; // 避免路径中出现空格被识别为多个命令

      const p = nodeChildProcess.exec(path)
      p.on('exit', (code)=>{
        const time = (Date.now()-startTime)/1000
        console.log(`process exit, execution time = ${time}, code=${code}`)
        nodeFs.writeFile('./dist/data.json', JSON.stringify({
          path,
          totalTime:time
        }), ()=>{})
      })
    }).catch(()=>{
      console.log('import dialog click cancel')
    })
  })
}