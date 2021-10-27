const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'serverinfo',
    description: 'Informações do servidor'
  },
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setColor('#f8f8f8')
      .setTitle('Informações do servidor')
      .setThumbnail(interaction.guild.iconURL())
      .addField('ID', interaction.guild.id.toString())
      .addField('Nome', interaction.guild.name)
      .addField('Dono', `<@${interaction.guild.ownerId}>`)
      .addField('Membros', interaction.guild.memberCount.toString())
      .addField(
        'Data de Criação',
        `<t:${~~(interaction.guild.createdTimestamp / 1000)}>`
      )
      .addField(
        'Você entrou em',
        `<t:${~~(interaction.member.joinedTimestamp / 1000)}>`
      )
      .setFooter(
        `Requisitado por ${interaction.user.username}`,
        interaction.user.displayAvatarURL()
      )
      .setTimestamp();

    return interaction.reply({
      embeds: [embed]
    });
  }
};
