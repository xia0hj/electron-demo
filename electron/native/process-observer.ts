import { execFile, ChildProcess, spawn } from 'node:child_process';
import { stat } from 'node:fs/promises'
import ffi from 'ffi-napi'
import { setTimeout, clearTimeout } from 'node:timers'

import activeWindow from 'active-win';

export class ProcessObserver {

  execProcess: ChildProcess;

  startTime: number;

  timer: NodeJS.Timeout;


  constructor(path: string) {
    this.startTime = Date.now();
    this.execProcess = execFile(path);
    this.execProcess.on('exit', () => {
      const exitTime = Date.now();
      clearTimeout(this.timer);
      console.log('进程结束: ', {
        exitTime,
        duration: `${(exitTime - this.startTime) / 1000}秒`
      })
    })

    console.log('进程启动: ', {
      pid: this.execProcess.pid,
      spawnfile: this.execProcess.spawnfile,
      startTime: this.startTime
    })

    const monitorHandler = async () => {
      const curWindow = await activeWindow();
      if(curWindow?.owner.processId === this.execProcess.pid){
        console.log('正在运行');
      }else{
        console.log('后台运行')
      }
      this.timer = setTimeout(monitorHandler, 1000);
    }
    this.timer = setTimeout(monitorHandler, 1000);
  }

}
