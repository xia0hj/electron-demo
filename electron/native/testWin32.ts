// @ts-nocheck

import { User32 } from 'win32-api/promise'
import { DTypes, U, DModel, DStruct } from 'win32-api';
import ffi from 'ffi-napi'
import ref from 'ref-napi'
import StructDi from 'ref-struct-di';




export const testEventHook = (pid: number) => {
  const user32 = User32.load();

  let buf = Buffer.alloc(2)

  setInterval(async()=>{
    const foregroundHwnd = await user32.GetForegroundWindow();
    await user32.GetWindowThreadProcessId(foregroundHwnd, buf);
    const foregroundPid = buf.readUint16LE();
    if(foregroundPid !== pid){
      console.log('后台运行')
    }else{
      console.log('正在运行')
    }
  }, 2000)
}

