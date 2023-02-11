CREATE TABLE IF NOT EXISTS exe(
  id INT PRIMARY KEY,
  name VARCHAR(30),
  path VARCHAR(100) NOT NULL,
  description TEXT,
  total_duration INT,
  last_access_time INT
);

CREATE TABLE IF NOT EXISTS run_period(
  exe_id INT NOT NULL,
  start_time INT NOT NULL,
  end_time INT NOT NULL,
  is_active BOOLEAN NOT NULL
);
