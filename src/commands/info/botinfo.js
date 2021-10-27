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
      .setTitle('Informações do membro')
      .addField(
        'Data de Criação',
        `<t:${~~(client.user.createdTimestamp / 1000)}>`
      )
      .addField('Servidores', `${client.guilds.cache.size}`)
      .addField('Usuários', `${client.users.cache.size}`)
      .addField('Canais', `${client.channels.cache.size}`)
      .addField(
        'RAM',
        `${parseInt(process.memoryUsage().rss / 1024 / 1024, 10)}MB`
      )
      .addField('Uptime', `<t:${~~(client.readyTimestamp / 1000)}:R>`)
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
