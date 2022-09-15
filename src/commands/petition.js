const { SlashCommandBuilder } = require('discord.js');
const { knex } = require('../db/db');
const { log } = require('../log');
const { UNIQUE_VIOLATION } = require('pg-error-constants');
const { query } = require('../db/sql');

async function petition(int) {
    const guildID = int.options.getString('guild');
    const sendTo = int.options.getString('send');
    const text = int.options.getString('text');
    try {
        const sql = await query('petition', 'insert');
        await knex.raw(sql,
            [guildID, sendTo, text, int.user.username]);
        return int.reply(`Petition added to ${guildID}`);
    } catch (err) {
        log.error(`DB Error: ${err.code}`);
        if (err.code == UNIQUE_VIOLATION) {
            return int.reply('A petition for that guild already exists');
        }
        return int.reply('Something went wrong addint a petition');
    }
}

const petCommand = new SlashCommandBuilder()
    .setName('petition')
    .setDescription('Starts a petition')
    .addStringOption(opt =>
        opt.setName('guild')
            .setDescription('The guild id')
            .setRequired(true))
    .addStringOption(opt =>
        opt.setName('send')
            .setDescription('Who to send it to')
            .setRequired(true))
    .addStringOption(opt =>
        opt.setName('text')
            .setDescription('The actual petition text')
            .setRequired(true));

module.exports = {
    data: petCommand,
    async execute(int) {
        await petition(int);
    },
};