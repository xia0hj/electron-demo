import { ipcMain, dialog } from "electron";
import { IPC_EVENT_OPEN_IMPORT_DIALOG } from "@shared/constants";
import nodeChildProcess from 'child_process'
import nodeFs from 'fs'

export function registerAllIpcEventHandlers() {
  ipcMain.on(IPC_EVENT_OPEN_IMPORT_DIALOG, ()=>{
    dialog.showOpenDialog({
      title: '导入文件'
    }).then(file=>{
      const startTime = Date.now()
      console.log('get file: ', file)
      const path = file.filePaths[0]
      const p = nodeChildProcess.exec(path)
      p.on('exit', (code)=>{
        const time = (Date.now()-startTime)/1000
        console.log(`process exit, execution time = ${time}, code=${code}`)
        nodeFs.writeFile('./data.json', JSON.stringify({
          path,
          totalTime:time
        }), ()=>{})
      })
    })
  })
}