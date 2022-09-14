const { SlashCommandBuilder } = require('discord.js');
const { knex } = require('../db/db');
const { log } = require('../log');
const { UNIQUE_VIOLATION } = require('pg-error-constants');

// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
async function addTag(int) {
    const tagName = int.options.getString('name');
    const tagDescription = int.options.getString('description');

    try {
        // const tag = await tags.create({
        //     name: tagName,
        //     description: tagDescription,
        //     username: int.user.username,
        // });
        // const trx = await knex.transaction();
        await knex.raw('INSERT INTO discbot.tags(name,description,username) VALUES (?, ?, ?)',
            [tagName, tagDescription, int.user.username]);
        // await knex.transaction(async trx => {
        //     log.info('transaction start');
        //     trx.raw('INSERT INTO tags(names,description,values)',
        //         [tagName, tagDescription, int.user.username]);
        //     // const ins = await trx.insert(
        //     //     [{
        //     //         name: tagName,
        //     //         description: tagDescription,
        //     //         username: int.user.username,
        //     //     }],
        //     // ).into('tags');
        //     // log.info(ins.length + ' tags added');
        //     // trx.commit();
        // });
        // log.info('Adding tag');
        return int.reply(`Tag ${tagName} added`);
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            return int.reply('That tag already exists');
        }
        log.error(err.code);
        return int.reply('Something went wrong adding the tag.');
    }
}

module.exports = {
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