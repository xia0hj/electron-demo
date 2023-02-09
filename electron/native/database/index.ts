import { Database, verbose } from "sqlite3";

const initDb = (db: Database) => {
  db.serialize(() => {
    db.run('create table if not exists test_table(name varchar(10))', () => {
      db.all('select * from sqlite_master where type="table";', (err, res) => {
        console.dir(res);
      })
    })
  })
}

export const loadSqlite = () => {
  const sqlite3 = verbose();
  const db = new sqlite3.Database("sq3.db");
  initDb(db);
}




// db.serialize(() => {
//   db.run("create table test(name varchar(20))", () => {
//     db.all('select * from sqlite_master where type="table";', (err, res) => {
//       console.dir(res);
//     })
//   })

// });



