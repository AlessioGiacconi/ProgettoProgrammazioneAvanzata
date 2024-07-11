CREATE DATABASE dbpa;

\c dbpa;

CREATE TYPE ROLE AS ENUM('user', 'admin', 'passage');

CREATE TABLE IF NOT EXISTS passages (
    passage_id SERIAL PRIMARY KEY,
    level INT NOT NULL,
    needs_dpi BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    badge_id SERIAL PRIMARY KEY, 
    email VARCHAR(100) NOT NULL,
    passwd VARCHAR(40) NOT NULL,
    role ROLE NOT NULL,
    is_suspended BOOLEAN NOT NULL,
    tokens INT NOT NULL,
    passage_reference INT, 
    unauthorized_attempts INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (passage_reference) REFERENCES passages(passage_id)
);

-- Crea una funzione per aggiornare la colonna updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updated_at" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crea un trigger che chiama la funzione prima di ogni aggiornamento
CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
WHEN (NEW.is_suspended = TRUE)
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS authorizations (
    badge INT NOT NULL,
    passage INT NOT NULL,
    FOREIGN KEY (badge) REFERENCES users(badge_id),
    FOREIGN KEY (passage) REFERENCES passages(passage_id)
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

INSERT INTO passages (level, needs_dpi) VALUES
(1, false),
(2, true),
(3, true),
(3, false),
(1, true);

INSERT INTO users (email, passwd, role, is_suspended, tokens, passage_reference, updated_at) VALUES
('alessio@gmail.com', 'password', 'user', false, 100, null, '2024-07-11 11:00:00'),
('francesco@gmail.com', 'password', 'user', true, 100, null, '2024-07-11 11:00:00'),
('mariogiordano@gmail.com', 'password', 'user', true, 100, null, '2024-07-11 11:00:00'),
('varco5@gmail.com', 'password', 'passage', false, 100, 5, '2024-07-11 11:00:00'),
('varco1@gmail.com', 'password', 'passage', false, 100, 1, '2024-07-11 11:00:00'),
('admin@admin.com', 'password', 'admin', false, 100, null, '2024-07-11 11:00:00');

INSERT INTO authorizations (badge, passage) VALUES
(1,1),
(1,3),
(2,2),
(3,5),
(4,4);

INSERT INTO transits (passage, badge, transit_date, is_authorized, violation_dpi) VALUES
(1, 1, '2023-07-01 08:30:00', true, false),
(2, 1, '2023-07-02 09:15:00', false, true),
(3, 2, '2023-07-03 10:45:00', true, false),
(1, 3, '2023-07-04 11:30:00', false, true),
(4, 4, '2023-07-05 12:00:00', true, false),
(5, 4, '2023-07-06 13:20:00', true, true);