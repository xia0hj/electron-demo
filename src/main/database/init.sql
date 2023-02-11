CREATE TABLE IF NOT EXISTS app(
  id INTEGER PRIMARY KEY,
  name VARCHAR(30),
  exe_path VARCHAR(100) NOT NULL UNIQUE,
  notes TEXT,
  total_duration INTEGER,
  last_access_time INTEGER
);

CREATE TABLE IF NOT EXISTS run_period(
  app_id INTEGER NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL
);
