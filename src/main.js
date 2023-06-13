const { Client, GatewayIntentBits, Partials, ChannelType } = require('discord.js');
const { token } = require('./config.json');
const Commands = require('./commands.js');
const variables = require('./variables.json');

const moon = new Client({ //Instance bot with intents
    partials: [
        Partials.Channel,
        Partials.Message // Required to receive DMs
    ],
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
    ]
});

const commands = new Commands(moon);

moon.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}`);
});

moon.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM){
        await message.channel.sendTyping();
        return await message.reply(variables.responses[Math.floor(Math.random() * variables.responses.length)]);
    }
});

moon.on('interactionCreate', (interaction) => {

    if(!interaction.isChatInputCommand()) return;
    commands.runCommand(interaction.commandName, interaction);

});

moon.login(token);