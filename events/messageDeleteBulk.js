const Discord = require("discord.js");
const config = require("../config.json");

exports.name = "messageDeleteBulk";
exports.run = async (client, messages) => {
    console.log('FIRE IN THE HOLE!');
    const message = messages.first();
    if (!message || !message.id || !message.content || !message.guild) return;

    const channel = message.guild.channels.find(channel => channel.name === "logando"); 
    if (!channel) return;
    const log = messages.map(m => `${m.createdAt} (${m.guild.id} / #${m.channel.id} / ${m.author.id}) ${m.author.tag} : ${m.cleanContent}`).join('\n');
    const hasteURL = await require('snekfetch')
        .post('https://hastebin.com/documents')
        .send(log).catch(e => {
            throw new Error(`Error posting data: ${e}`);
        });
    const url = `http://hastebin.com/${hasteURL.body.key}.txt`;
    const embed = new Discord.RichEmbed()
    .setTitle(`🗑 ${messages.size} mensagens removidas`)
    .addField('Deletado por', message.author.name)
    .addField('Canal', message.channel)
    .addField('URL', url)
    .setThumbnail('https://i.imgur.com/KCXtp0X.png')
    .setColor(config.color);
    channel.send(embed);
};