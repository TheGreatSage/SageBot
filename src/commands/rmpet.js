const { SlashCommandBuilder } = require('discord.js');
const { knex } = require('../db/db');
const { log } = require('../log');

async function rmPetition(int) {
    if (int.user.id !== '551452714001891334') {
        return int.reply('You are not sage!');
    }
    const guildID = int.options.getString('guild');
    try {
        await knex('petition')
            .where('guild_id', '=', guildID)
            .del();
        await knex('signed')
            .where('guild_id', '=', guildID)
            .del();
        return int.reply('Petition removed');
    } catch (error) {
        log.error(`rm ${error}`);
        return int.reply('Something went wrong deleting the petition!');
    }
}

const rmPet = new SlashCommandBuilder()
    .setName('rmpet')
    .setDescription('Removes a petition')
    .addStringOption(opt =>
        opt.setName('guild')
            .setDescription('Guild id')
            .setRequired(true));


module.exports = {
    data: rmPet,
    async execute(int) {
        await rmPetition(int);
    },
};