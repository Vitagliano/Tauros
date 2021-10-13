const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'botinfo',
    aliases: ['bot']
  },
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('#f8f8f8')
      .addField(
        `**Data de Criação ** `,
        `<t:${~~(new Date(client.user.createdAt).getTime() / 1000)}>`
      )
      .addField(`**Guilds  **`, client.guilds.cache.size.toString())
      .addField(`**Usuários  **`, client.users.cache.size.toString())
      .addField(`**Canais  **`, client.channels.cache.size.toString())
      .setFooter(
        `Requisitado por ${message.author.username}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    message.reply({
      embeds: [embed]
    });
  }
};
