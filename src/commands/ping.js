const { SlashCommandBuilder } = require('discord.js');
const { log } = require('../log');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(int) {
        log.trace("Ponged");
        await int.reply('Pong!');
    },     
}