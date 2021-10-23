const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'serverinfo',
    aliases: ['server']
  },
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor('#f8f8f8')
      .setTitle('Informações do servidor')
      .setThumbnail(message.guild.iconURL())
      .addField('ID', message.guild.id.toString())
      .addField('Nome', message.guild.name)
      .addField('Dono', `<@${message.guild.ownerId}>`)
      .addField('Membros', message.guild.memberCount.toString())
      .addField(
        `Data de Criação`,
        `<t:${~~(message.guild.createdTimestamp / 1000)}>`
      )
      .addField(
        `Você entrou em`,
        `<t:${~~(message.member.joinedTimestamp / 1000)}>`
      )
      .setFooter(
        `Requisitado por ${message.author.username}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    return message.reply({
      embeds: [embed]
    });
  }
};
