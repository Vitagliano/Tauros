const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'servericon',
    description: 'Ícone do servidor'
  },
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setColor('#f8f8f8')
      .setFooter(
        `Requisitado por ${interaction.user.username}`,
        interaction.user.displayAvatarURL()
      )
      .setTimestamp();

    if (interaction.guild.iconURL())
      embed
        .setTitle('Ícone do servidor')
        .setImage(interaction.guild.iconURL({ size: 1024, dynamic: true }));
    else embed.setTitle('Servidor sem ícone');

    interaction.reply({
      embeds: [embed]
    });
  }
};
