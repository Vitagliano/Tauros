const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'botinfo',
    description: 'Informações do bot'
  },
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('#f8f8f8')
      .setTitle('Informações do bot')
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
        `Requisitado por ${interaction.user.username}`,
        interaction.user.displayAvatarURL()
      )
      .setTimestamp();

    interaction.reply({
      embeds: [embed]
    });
  }
};
