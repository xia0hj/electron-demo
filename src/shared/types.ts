export interface Exe {
  id?:number,
  name:string,
  path:string,
  description?:string,
  totalDuration?: number,
  lastAccessTime?: number,
}

export interface RunPeriod {
  exeId: number,
  startTime:number,
  endTime:number,
  isActive:boolean
}
