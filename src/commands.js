const v = require('./variables.json');

async function hug(interaction){
    var id = interaction.options.get('user').value;
    if(id === '0000000'){
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

module.exports = {
    hug,
    cry
}