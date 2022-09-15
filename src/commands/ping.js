const { SlashCommandBuilder } = require('discord.js');
const { log } = require('../log');

module.exports = {
    active: false,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(int) {
        log.trace('Ponged');
        log.info(typeof int.guild.id);
        await int.reply('Pong!');
    },
};