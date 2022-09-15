const { SlashCommandBuilder } = require('discord.js');
const { knex } = require('../db/db');
const { log } = require('../log');
const { UNIQUE_VIOLATION } = require('pg-error-constants');
const { query } = require('../db/sql');

// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
async function addTag(int) {
    const tagName = int.options.getString('name');
    const tagDescription = int.options.getString('description');
    try {
        const sql = await query('tags', 'insert');
        await knex.raw(sql,
            [tagName, tagDescription, int.user.username]);
        return int.reply(`Tag ${tagName} added`);
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            return int.reply('That tag already exists');
        }
        log.error(err);
        return int.reply('Something went wrong adding the tag.');
    }
}

module.exports = {
    active: false,
    data: new SlashCommandBuilder()
        .setName('addtag')
        .setDescription('Adds a tag!')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The Name of the tag')
                .setRequired(true)
                .setMaxLength(100))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('desc')
                .setRequired(true)),
    async execute(int) {
        await addTag(int);
    },
};