CREATE DATABASE dbpa;

\c dbpa;

CREATE TABLE IF NOT EXISTS users (
    badgeId SERIAL PRIMARY KEY, 
    email VARCHAR(100) NOT NULL,
    passwd VARCHAR(40) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    authLevel INT NOT NULL,
    isSuspended BOOLEAN NOT NULL,
    tokens INT NOT NULL
);

CREATE TABLE IF NOT EXISTS passages (
    passageId SERIAL PRIMARY KEY,
    level INT NOT NULL,
    needsDPI BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS transits (
    transitId SERIAL PRIMARY KEY,
    passage INT NOT NULL,
    badge INT NOT NULL,
    transitDate TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    isAuthorized BOOLEAN NOT NULL,
    violationDPI BOOLEAN NOT NULL,
    FOREIGN KEY (badge) REFERENCES users(badgeId),
    FOREIGN KEY (passage) REFERENCES passages(passageId)
);

INSERT INTO users (email, passwd, isAdmin, authLevel, isSuspended, tokens) VALUES
('alessio@gmail.com', 'password', false, 3, false, 100),
('francesco@gmail.com', 'password', false, 3, false, 100),
('carcarlo@gmail.com', 'password', false, 1, true, 100),
('admin@admin.com', 'password', true, 3, false, 100);

INSERT INTO passages (level, needsDPI) VALUES
(1, false),
(2, true),
(3, true),
(3, false),
(1, true);

INSERT INTO transits (passage, badge, transitDate, isAuthorized, violationDPI) VALUES
(1, 1, '2023-07-01 08:30:00', true, false),
(2, 1, '2023-07-02 09:15:00', false, true),
(3, 2, '2023-07-03 10:45:00', true, false),
(1, 3, '2023-07-04 11:30:00', false, true),
(4, 4, '2023-07-05 12:00:00', true, false),
(5, 4, '2023-07-06 13:20:00', true, true);