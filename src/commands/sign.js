const { SlashCommandBuilder } = require('discord.js');
const { knex } = require('../db/db');
const { log } = require('../log');
const { query } = require('../db/sql');
const { spam } = require('../spam_petition');

async function sign(int) {
    const guildID = int.guild.id;
    const user = int.user.username;
    try {
        let sql = await query('petition', 'select');
        const r1 = await knex.raw(sql, [guildID]);
        if (r1.rowCount === 0) {
            return int.reply('There is no petition for this server');
        }
        sql = await query('sign_both', 'select');
        const result = await knex.raw(sql, [user, guildID]);
        // log.info(result.rowCount.toString());
        if (result.rowCount > 0) {
            await knex('signed')
                .where('guild_id', '=', guildID)
                .andWhere('name', '=', user)
                .increment('signed');
            spam(int.client, int.channel, guildID);
            return int.reply('Someone is persitant.');
        }
        // log.info(result);
        sql = await query('sign', 'insert');
        await knex.raw(sql,
            [guildID, user]);
        await knex('petition')
            .where('guild_id', '=', guildID)
            .increment('signed');
        spam(int.client, int.channel, guildID);
        return int.reply('You signed the petition.');
    } catch (err) {
        log.error(`DB Error: ${err.code}`);
        return int.reply('Could not sign the petition');
    }
}

const signCommand = new SlashCommandBuilder()
    .setName('sign')
    .setDescription('Signs the current petition.');

module.exports = {
    active: true,
    data: signCommand,
    async execute(int) {
        await sign(int);
    },
};