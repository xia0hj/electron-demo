import { App, RunPeriod } from '@shared/types';
import BetterSqlite3 from 'better-sqlite3';
import nodePath from 'node:path';
import INIT_SQL from './init.sql?raw'


const db = new BetterSqlite3(nodePath.join(process.cwd(), 'user-data', 'storage.sqlite'));
db.pragma('journal_mode = WAL');
db.exec(INIT_SQL);

export const DatabaseApi = {
  importApp(app: App):App{
    const {lastInsertRowid} =db.prepare('INSERT INTO app (name, exe_path, notes, total_duration, last_access_time) VALUES(?,?,?,?,?)').run([
      app.name,
      app.exePath,
      app.notes,
      app.totalDuration,
      app.lastAccessTime
    ]);
    return {
      id: Number(lastInsertRowid),
      ...app,
    }
  },
  logRunPeriod(period:RunPeriod){
    console.log('database period: ', period);
    db.prepare('INSERT INTO run_period (app_id, start_time, end_time, is_active) VALUES (?,?,?,?)').run([
      period.appId,
      period.startTime,
      period.endTime,
      period.isActive ? 1 : 0
    ]);
  },

}





