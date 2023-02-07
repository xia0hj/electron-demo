import { execFile, ChildProcess, spawn } from 'node:child_process';
import { stat } from 'node:fs/promises'
import { User32 } from 'win32-api/promise';
import { DTypes } from 'win32-api'
import ffi from 'ffi-napi'

import { testEventHook } from './testWin32';

export class ProcessObserver {

  execProcess: ChildProcess;

  startTime: number;


  constructor(path: string) {
    this.startTime = Date.now();
    this.execProcess = execFile(path);
    this.execProcess.on('exit', () => {
      const exitTime = Date.now();
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

    if (this.execProcess.pid !== undefined) {
      testEventHook(this.execProcess.pid);
    }

  }


}
