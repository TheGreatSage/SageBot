// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./src/env.js');
const { log } = require('./src/log.js');
const coms = require('./src/deploy-commands');
// const { tags } = require('./src/db.js');
// const { exit } = require('node:process');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    log.info(`Logged in as ${client.user.tag}`);
    // tags.sync({ force: true});
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    log.info(`${interaction.user.tag} in #${interaction.channel.name} triggered`);
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;
    try {
        log.trace(interaction.commandName);
        await command.execute(interaction);
    } catch (error) {
        log.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


coms.update();

client.login(token);
