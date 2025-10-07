-- psql -h localhost -U myuser -d mydatabase

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE employee (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  salary float,
  role VARCHAR(50) NOT NULL DEFAULT 'EMPLOYEE'
);

CREATE table credentials (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  authority VARCHAR(50) NOT NULL DEFAULT 'USER',
  employee_uuid UUID REFERENCES employee(uuid) ON DELETE CASCADE
);

INSERT INTO employee (uuid, name, salary, role) VALUES
  ('2ed68a29-6efa-4d5a-b0f7-4615a75fc330', 'Alice', 100, 'EMPLOYEE'),
  ('e7e804d7-c0db-49fd-9568-3a0e539e97fe', 'Bob', 100, 'EMPLOYEE'),
  ('99f67200-ee16-440f-94cd-8c3de4de9807', 'Charlie', 120, 'MANAGER');

INSERT INTO credentials (username, password, employee_uuid, authority) VALUES
  ('alice', crypt('password1', gen_salt('bf')), '2ed68a29-6efa-4d5a-b0f7-4615a75fc330', 'USER'),
  ('bob', crypt('password2', gen_salt('bf')), 'e7e804d7-c0db-49fd-9568-3a0e539e97fe', 'USER'),
  ('charlie', crypt('password3', gen_salt('bf')), '99f67200-ee16-440f-94cd-8c3de4de9807', 'ADMIN');
