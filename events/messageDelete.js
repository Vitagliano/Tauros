const Discord = require('discord.js');
const config = require('../config.json');
const moment = require("moment");

exports.name = 'messageDelete';
exports.run = (client, message) => {

    if (message.author.bot) return; 

    if (!message || !message.id || !message.content || !message.guild) return;
    const channel = message.guild.channels.find(channel => channel.name === "logando");
    if (!channel) return;
    channel.send(`\`[${moment(new Date()).format('h:mm:ss')}]\` 🗑 ${message.author.tag} (\`${message.author.id}\`) Mensagem deletada em **#${message.channel.name}**:\n${message.cleanContent}`);
}