const Discord = require('discord.js');
const config = require('../../../config.json');
const profileDB = require('../../../models/profile');

exports.run = async (client, message, args) => {
    profileDB.findOne({ userID: message.author.id }, async function(err, doc) {
        const embed = new Discord.RichEmbed()
            .setTitle(message.author.username)
            .addField('Seu level é:', doc.level)
            .addField('Seu XP é:', doc.xp)
            .setColor(config.color);
        message.channel.send({ embed });
    });
};

exports.help = {
    name: 'level',
    description: 'Mostra seu level dentro da guilda',
    usage: 'level',
    category: 'Experience'
};
