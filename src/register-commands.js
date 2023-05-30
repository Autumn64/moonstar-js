const { token, guild, client } = require('./config.json');
const { REST, Routes } = require('discord.js');
const commands = require('./commands.json');

const rest = new REST({ version: 10 }).setToken(token);

const add = (async () => {
    try{
        await rest.put(
            Routes.applicationGuildCommands(client, guild),
            { body: commands }
        );
        console.log("Commands added succesfully!");
    }catch(e){
        console.log(`Error: ${e}`);
    }
});

add();