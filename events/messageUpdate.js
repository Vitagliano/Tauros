const Discord = require('discord.js');
const config = require('../config.json');

exports.name = 'messageUpdate';
exports.run = (oldMessage, newMessage, message) => {
    // if (["discord.gg/", "discordapp.com/invite/", "invite.gg/", "discord.io/", "discord.me/", "discord.plus/", "dis.gd/"].some(invite => message.content.includes(invite) && !message.content.includes("https://discord.gg/EhjgQ24"))) {
    //     message.delete().then(message.channel.send(`${message.author} você não pode enviar links de outros servidores aqui!`).then(msg => msg.delete(8000)))
    // }

    // if (newMessage.channel.type === 'dm') return;
    // if (oldMessage.content == newMessage.content) return;

    // let logChannel = message.guild.channels.get(config.channels.logChannel);
    // if (!logChannel) return;

    // if (newMessage.author.bot) return;

    // let embed = new Discord.RichEmbed()
    //     .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
    //     .setDescription('📝 **<@' + message.author.id + '> editou uma mensagem de texto**\n\n**Canal de texto:** <#' + message.channel.id + '>\n\n**Antiga mensagem**: \n```' + newMessage.content + '```\n\n**Nova mensagem**: \n```' + message.content + '``` ')
    //     .setColor("RANDOM")
    //     .setTimestamp()
    // logChannel.send(embed);
}