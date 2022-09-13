const Sequelize = require('sequelize');
const { dbPass, dbUser, dbDial, dbHost, dbPort, dbData } = require('./env');


const sequelize = new Sequelize({
	logging: false,
    username: dbUser,
    host: dbHost,
    password: dbPass,
    database: dbData,
    port: dbPort,
    dialect: dbDial
});

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
});



module.exports = {
    db: sequelize,
    tags: Tags
}