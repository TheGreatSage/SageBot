const { SlashCommandBuilder } = require('discord.js');
const { tags } = require('../db');
const { log } = require('../log');

// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
async function addTag(int) {
    const tagName = int.options.getString('name');
    const tagDescription = int.options.getString('description');

    try {
        log.info("Adding tag");
        const tag = await tags.create({
            name: tagName,
            description: tagDescription,
            username: int.user.username, 
        }); 
        return int.reply(`Tag ${tag.name} added`);
    } catch (err) {
        if (err.name == 'SequelizeUniqueConstraintError') {
            return int.reply('That tag already exists');
        }

        return int.reply('Something went wrong adding the tag.');
    }
};

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
}