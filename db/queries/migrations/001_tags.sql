CREATE TABLE tags(
    name  VARCHAR(255) UNIQUE,
    description TEXT,
    username VARCHAR(255),
    usage_count INT NOT NULL DEFAULT 0
);