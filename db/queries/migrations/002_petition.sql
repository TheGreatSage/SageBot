CREATE TABLE petition(
    guild_id VARCHAR(255) NOT NULL UNIQUE,
    send_to VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    creator VARCHAR(255),
    signed INT NOT NULL DEFAULT 0,
    PRIMARY KEY (guild_id)
);