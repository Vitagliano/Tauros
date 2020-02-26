const Discord = require("discord.js");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
    const amount = parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
    if (!amount) return message.reply('você precisa expecificar a quantidade de mensagens para deletar.');
    message.channel.fetchMessages({
        limit: `${amount+1}`
    }).then((messages) => {
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
};

exports.help = {
    name: "purge",
    description: "Comando para deletar mensagens",
    usage: "purge",
    category: "Staff"
};