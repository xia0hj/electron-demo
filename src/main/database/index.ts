import { Exe, RunPeriod } from '@shared/types';
import BetterSqlite3 from 'better-sqlite3';
import nodePath from 'node:path';
import INIT_SQL from './init.sql?raw'


const db = new BetterSqlite3(nodePath.join(process.cwd(), 'user-data', 'storage.sqlite'));
db.pragma('journal_mode = WAL');
db.exec(INIT_SQL);

export const DatabaseApi = {
  addExe(exe: Exe):Exe{
    const {lastInsertRowid} =db.prepare('INSERT INTO exe (name, path, description, total_duration, last_access_time) VALUES(?,?,?,?,?)').run([
      exe.name,
      exe.path,
      exe.description,
      exe.totalDuration,
      exe.lastAccessTime
    ]);
    return {
      id: Number(lastInsertRowid),
      ...exe,
    }
  },
  logRunPeriod(period:RunPeriod){
    console.log('database period: ', period);
    db.prepare('INSERT INTO run_period (exe_id, start_time, end_time, is_active) VALUES (?,?,?,?)').run([
      period.exeId,
      period.startTime,
      period.endTime,
      period.isActive ? 1 : 0
    ]);
  }
}





