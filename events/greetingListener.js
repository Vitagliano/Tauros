const Discord = require('discord.js')
const config = require('../config.json');

let welcomeChannel;

module.exports = [
    {
        name: "ready",
        run: (client) => {
            //welcomeChannel = client.channels.get(config.channels.welcomeChannel);
        }
    }, {
        name: 'guildMemberAdd',
        run: (client, member) => {
            if (welcomeChannel) {
                const role = member.guild.roles.find(role => role.id == config.ranks.autorole);
                member.addRole(role);
                const embed = new Discord.RichEmbed()
                .setTitle(`🎉 Olá ${member.user.username}`)
                .setDescription(`Sejá bem-vindo(a) ao Discord da REDE DUEL`)
                .setThumbnail(member.user.displayAvatarURL)
                .addField(`🕹️ **IP**`,`jogar.rededuel.com`)
                .addField(`💻 **SITE**`,`[loja.rededuel.com](loja.rededuel.com)`)
                .addField(`🐦 **TWITTER**`,`https://twitter.com/RedeDuel`)
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter(`${member.user.username} tem alguma dúvida? Entre em contato com a staff`, member.guild.iconURL)
                welcomeChannel.send(embed);
            }
        }
    }
];
