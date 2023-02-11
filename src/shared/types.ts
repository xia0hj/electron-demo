export interface App {
  /**
   * rowid in sqlite, id=-1 -> not submit to sqlite
   */
  id:number,
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
