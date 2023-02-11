import { execFile, ChildProcess, spawn } from 'node:child_process';
import { stat } from 'node:fs/promises'
import { setTimeout, clearTimeout } from 'node:timers'

import activeWindow from 'active-win';
import { App } from '@shared/types';
import { DatabaseApi } from '@main/database';

export class ProcessObserver {

  app: App;

  execProcess: ChildProcess;

  startTime: number;

  timer: NodeJS.Timeout;


  constructor(app: App) {
    this.startTime = Date.now();
    this.execProcess = execFile(app.exePath);
    this.execProcess.on('exit', () => {
      const exitTime = Date.now();
      clearTimeout(this.timer);
      console.log('进程结束: ', {
        exitTime,
        duration: `${(exitTime - this.startTime) / 1000}秒`
      })
    })
    this.app = app;
    console.log('进程启动: ', {
      pid: this.execProcess.pid,
      spawnfile: this.execProcess.spawnfile,
      startTime: this.startTime
    })


    let isActive = true;
    let periodStartTime = this.startTime;

    const monitorHandler = async () => {
      const curWindow = await activeWindow();
      const curActiveFlag = curWindow?.owner.processId === this.execProcess.pid;
      if(curActiveFlag!==isActive){
        const curTimestamp = Date.now()
        DatabaseApi.logRunPeriod({
          appId: this.app.id as number,
          startTime: periodStartTime,
          endTime: curTimestamp,
          isActive
        })

        isActive = curActiveFlag;
        periodStartTime = curTimestamp
      }
      this.timer = setTimeout(monitorHandler, 1000);
    }
    this.timer = setTimeout(monitorHandler, 1000);
  }
}
