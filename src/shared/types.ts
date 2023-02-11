export interface App {
  id?:number,
  name:string,
  exePath:string,
  notes?:string,
  totalDuration?: number,
  lastAccessTime?: number,
}

export interface RunPeriod {
  appId: number,
  startTime:number,
  endTime:number,
  isActive:boolean
}
