import bsq3 from 'better-sqlite3';

export const loadSqlite = () => {
  const db = new bsq3('foobar.db');
  db.pragma('journal_mode = WAL');
  db.exec('create table if not exists test_table(name varchar(10))');
}






