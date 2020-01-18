const Discord = require("discord.js");
const config = require("../config.json");

exports.name = "messageDeleteBulk";
exports.run = async (client, messages) => {
    //for (const msg of messages) client.emit('messageDelete', msg);
    for (const [key, msg] of messages) {
        client.emit('messageDeleted', msg);
    }



    // const msg = messages.first();
    // if (!msg.guild || !msg.guild.configs.logs.channel || !msg.guild.configs.logs.messageDeletes) return;

    // if (!msg.id || !msg.content) return;

    // const channel = msg.guild.channels.get(config.channels.logChannel);

    // if (!channel || !channel.embedable) return;

    // const log = messages.map(m => `${m.createdAt} (${m.guild.id} / #${m.channel.id} / ${m.author.id}) ${m.author.tag} : ${m.cleanContent}`).join('\n');
    // const hasteURL = await require('snekfetch')
    //     .post('https://hastebin.com/documents')
    //     .send(log).catch(e => { throw new Error(`Error posting data: ${e}`); });
    // const url = `http://hastebin.com/${hasteURL.body.key}.txt`;

    // channel.send(`<#${msg.channel.id}>`, {
    //     embed: new Discord.RichEmbed()
    //         .setDescription(`${messages.size} foram deletadas.\n${url}`)
    // });
};
