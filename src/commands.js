const v = require('./variables.json');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { translate } = require('@vitalets/google-translate-api');

class Commands{

    constructor(client){
        this.client = client;
    }

    async hug(interaction){
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

    async ping(interaction){
        interaction.reply(`Pong! 🏓 Ping is ${this.client.ws.ping} ms`);
    }

    async cry(interaction){
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

    async avatar(interaction){
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

    async pride(interaction){
        await interaction.reply({
            content: v.lgbtqplus[Math.floor(Math.random() * v.lgbtqplus.length)],
            ephemeral: true
        });
        return;
    }

    async meme(interaction){
        var subrdd = v.subrdd[Math.floor(Math.random() * v.subrdd.length)];
        const response = (await axios.get(`https://www.reddit.com/r/${subrdd}/hot.json`)).data.data.children;
        const posts = response.map(post => post.data.permalink); //Get the links from the JSON.
        var meme = posts[Math.floor(Math.random() * posts.length)];
        await interaction.reply(`Meme from r/${subrdd} https://www.reddit.com${meme}`);
        return;
    }

    async translation(interaction){
        await interaction.deferReply();
        const languages = Object.keys(v.LANGUAGES).reduce((value, keys) => {
            value[keys.toLowerCase()] = v.LANGUAGES[keys];
            return value;
        }, {}); //New object with keys lowercased.
        var key;
        var found;
        var message = interaction.options.get('message').value;
        var destlang = interaction.options.get('language'); //Might be null since argument is optional.
        if (destlang === null){
            key = "English";
            destlang = "en";
        }else{
            if(languages.hasOwnProperty(destlang.value.toLowerCase())){
                key = destlang.value.toLowerCase();
                destlang = languages[key];
                found = true;
            }else{
                found = false;
            }
        }
        if (found === false){
            if(!v.LANGUAGEKEYS.hasOwnProperty(destlang.value.toLowerCase())){
                interaction.followUp({
                    content: "I'm sorry, I can't speak `" + destlang.value + "`.",
                    ephemeral: true
                });
                return;
            }else{
                destlang = destlang.value;
            }
        }
        try{
            const resp = await translate(message, { to: destlang });
            const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Translation from ${v.LANGUAGEKEYS[resp.raw.src]} to ${v.LANGUAGEKEYS[destlang]}.`)
            .setURL(`https://translate.google.com/?sl=auto&tl=${destlang}&text=${message}`.replace(/ /g, '%20'))
            .setThumbnail("https://cdn2.iconfinder.com/data/icons/web-store-crayons-volume-1/256/Language-512.png")
            .addFields({ name: `${interaction.user.username} wrote:`, value: message},
                    { name: "Which translates to:", value: resp.text});
            await interaction.followUp({ embeds: [embed] });
        }catch(e){
            await interaction.followUp({
                content: "ERROR: `" + e + "`. This incident will be reported.",
                ephemeral: true
            });
            console.log(e);
        }
        return;
    }
}

module.exports = Commands;