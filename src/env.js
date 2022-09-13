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
    dbPort: process.env.DB_PORT
}