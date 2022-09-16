require('dotenv').config();
const dbConf = {
    production: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        pass: process.env.DB_PASS,
        data: process.env.DB_DATABASE,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        file: process.env.DB_FILE,
    },
    development: {
        user: process.env.DB_DEV_USER,
        host: process.env.DB_DEV_HOST,
        pass: process.env.DB_DEV_PASS,
        data: process.env.DB_DEV_BASE,
        dialect: process.env.DB_DEV_DIALECT,
        port: process.env.DB_DEV_PORT,
        file: process.env.DB_DEV_FILE,
    },
    testing: {
        user: process.env.DB_TEST_USER,
        host: process.env.DB_TEST_HOST,
        pass: process.env.DB_TEST_PASS,
        data: process.env.DB_TEST_BASE,
        dialect: process.env.DB_TEST_DIALECT,
        port: process.env.DB_TEST_PORT,
        file: process.env.DB_TEST_FILE,
    },
};

module.exports = {
    token: process.env.TOKEN,
    guildId: process.env.GUILD_ID,
    clientId: process.env.CLIENT_ID,
    adminId: process.env.ADMIN_ID,
    dbConf: dbConf,
};