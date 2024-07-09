CREATE DATABASE dbpa;

\c dbpa;

CREATE TYPE ROLE AS ENUM('user', 'admin', 'passage');

CREATE TABLE IF NOT EXISTS users (
    badge_id SERIAL PRIMARY KEY, 
    email VARCHAR(100) NOT NULL,
    passwd VARCHAR(40) NOT NULL,
    role ROLE NOT NULL,
    auth_level INT NOT NULL,
    is_suspended BOOLEAN NOT NULL,
    tokens INT NOT NULL
);

CREATE TABLE IF NOT EXISTS passages (
    passage_id SERIAL PRIMARY KEY,
    level INT NOT NULL,
    needs_dpi BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS transits (
    transit_id SERIAL PRIMARY KEY,
    passage INT NOT NULL,
    badge INT NOT NULL,
    transit_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_authorized BOOLEAN NOT NULL,
    violation_dpi BOOLEAN NOT NULL,
    FOREIGN KEY (badge) REFERENCES users(badge_id),
    FOREIGN KEY (passage) REFERENCES passages(passage_id)
);

INSERT INTO users (email, passwd, role, auth_level, is_suspended, tokens) VALUES
('alessio@gmail.com', 'password', 'user', 3, false, 100),
('francesco@gmail.com', 'password', 'user', 3, false, 100),
('carcarlo@gmail.com', 'password', 'user', 1, true, 100),
('admin@admin.com', 'password', 'admin', 3, false, 100);

INSERT INTO passages (level, needs_dpi) VALUES
(1, false),
(2, true),
(3, true),
(3, false),
(1, true);

INSERT INTO transits (passage, badge, transit_date, is_authorized, violation_dpi) VALUES
(1, 1, '2023-07-01 08:30:00', true, false),
(2, 1, '2023-07-02 09:15:00', false, true),
(3, 2, '2023-07-03 10:45:00', true, false),
(1, 3, '2023-07-04 11:30:00', false, true),
(4, 4, '2023-07-05 12:00:00', true, false),
(5, 4, '2023-07-06 13:20:00', true, true);