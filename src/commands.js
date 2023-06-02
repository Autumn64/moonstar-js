const v = require('./variables.json');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

async function hug(interaction){
    var id = interaction.options.getUser('user').id;
    if(id === '1112478094469632132'){
        await interaction.reply(`<@${interaction.user.id}>, thank you! <3`);
        return;
    }
    if (id !== interaction.user.id){
            await interaction.reply(`<@${interaction.user.id}> has hugged <@${id}>!`);
            await interaction.followUp(v.huggifs[Math.floor(Math.random() * v.huggifs.length)]);
    }else{
            await interaction.reply(`<@${interaction.user.id}> has hugged themselves!`);
    }
    return;
}

async function cry(interaction){
    await interaction.reply(`<@${interaction.user.id}> is crying!`);
    await interaction.channel.send(v.crygif[Math.floor(Math.random() * v.crygif.length)]);
    var reason = interaction.options.get('reason');
    if(reason !== null){
        try{
            await interaction.user.send("Keep it up! I hope everything gets better for you <3.");
            await interaction.user.send(v.huggifs[Math.floor(Math.random() * v.huggifs.length)]);
        }
        catch(e){
            await interaction.followUp({
                content: `<@${interaction.user.id}> Keep it up! I hope everything gets better for you <3.`,
                ephemeral: true
            });
            await interaction.followUp({
                content: v.huggifs[Math.floor(Math.random() * v.huggifs.length)],
                ephemeral: true
            });
        }
    }
    return;
}

async function avatar(interaction){
    const embed = new EmbedBuilder(); //Create embed
    var user = interaction.options.getUser('user');
    if (user !== null){
        var username = user.tag;
        var avatar = user.displayAvatarURL({size: 512});
        embed.setFooter({text: `Requested by: ${interaction.user.tag}`}); //Set footer if user is not null
    }else{
        var username = interaction.user.tag;
        var avatar = interaction.user.displayAvatarURL({size: 512});
    }
    embed.setColor('Random');
    embed.setTitle(`${username}'s avatar`);
    embed.setImage(avatar);

    await interaction.reply({embeds: [embed]});
    return;
}

async function pride(interaction){
    await interaction.reply({
        content: v.lgbtqplus[Math.floor(Math.random() * v.lgbtqplus.length)],
        ephemeral: true
    });
    return;
}

async function meme(interaction){
    var subrdd = v.subrdd[Math.floor(Math.random() * v.subrdd.length)];
    const response = (await axios.get(`https://www.reddit.com/r/${subrdd}/hot.json`)).data.data.children;
    const posts = response.map(post => post.data.permalink); //Get the links from the JSON.
    var meme = posts[Math.floor(Math.random() * posts.length)];
    await interaction.reply(`Meme from r/${subrdd} https://www.reddit.com${meme}`);
    return;
}

module.exports = {
    hug,
    cry,
    avatar,
    pride,
    meme
}