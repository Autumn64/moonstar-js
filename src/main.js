const { Client, GatewayIntentBits, Partials, ChannelType } = require('discord.js');
const { token } = require('./config.json');
const commands = require('./commands.js');
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

    switch(interaction.commandName){
        case 'hug':
            commands.hug(interaction);
            break;
        case 'ping':
            interaction.reply(`Pong! 🏓 Ping is ${moon.ws.ping} ms`);
            break;
        case 'cry':
            commands.cry(interaction);
            break;
        default:
            break;
    }
});

moon.login(token);