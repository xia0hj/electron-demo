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

      const path = file.filePaths[0]

      execPath(path)

    }).catch(()=>{
      console.log('import dialog click cancel')
    })
  })
}

function execPath(path:string) {
  const runningProcess = nodeChildProcess.exec('"'+path+'"')

  console.log('is running')

  runningProcess.on('exit', (code)=>{
    const exitTime = Date.now()
    console.log('exit time = ', exitTime)
    nodeFs.stat(path, (err, stats)=>{
      nodeFs.writeFile('./dist/data.json', JSON.stringify({
        path,
        totalTime: exitTime - stats.atimeMs
      }), ()=>{})
    })
  })
}