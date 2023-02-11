import bsq3 from 'better-sqlite3';
import initSql from './sql/init.sql?raw';
import nodePath from 'node:path'

export const loadSqlite = (storageDir: string) => {
  const db = new bsq3(nodePath.join(storageDir, 'storage.sqlite'));
  db.pragma('journal_mode = WAL');
  db.exec(initSql);
}






