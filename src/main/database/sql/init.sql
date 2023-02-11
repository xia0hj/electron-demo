CREATE TABLE IF NOT EXISTS game(
  id INTEGER PRIMARY KEY,
  name VARCHAR(30),
  path VARCHAR(100) NOT NULL,
  description TEXT,
  total_duration INT,
  last_access_time TEXT
);

CREATE TABLE IF NOT EXISTS run_period(
  game_id INT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_active BOOLEAN NOT NULL
);
