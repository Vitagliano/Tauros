const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'servericon',
    aliases: ['guildicon', 'icon']
  },
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor('#f8f8f8')
      .setFooter(
        `Requisitado por ${message.author.username}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    if (message.guild.iconURL())
      embed
        .setTitle('Ícone do servidor')
        .setImage(message.guild.iconURL({ size: 1024, dynamic: true }));
    else embed.setTitle('Servidor sem ícone');

    message.reply({
      embeds: [embed]
    });
  }
};
