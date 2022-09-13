require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    guildId: process.env.GUILD_ID,
    clientId: process.env.CLIENT_ID,
    dbUser: process.env.DB_USER,
    dbHost: process.env.DB_HOST,
    dbPass: process.env.DB_PASS,
    dbData: process.env.DB_DATABASE,
    dbDial: process.env.DB_DIALECT,
    dbPort: process.env.DB_PORT,
    dbUser_test: process.env.DB_TEST_USER,
    dbHost_test: process.env.DB_TEST_HOST,
    dbPass_test: process.env.DB_TEST_PASS,
    dbData_test: process.env.DB_TEST_DATABASE,
    dbDial_test: process.env.DB_TEST_DIALECT,
    dbPort_test: process.env.DB_TEST_PORT,
    dbUser_dev: process.env.DB_DEV_USER,
    dbHost_dev: process.env.DB_DEV_HOST,
    dbPass_dev: process.env.DB_DEV_PASS,
    dbData_dev: process.env.DB_DEV_DATABASE,
    dbDial_dev: process.env.DB_DEV_DIALECT,
    dbPort_dev: process.env.DB_DEV_PORT
}