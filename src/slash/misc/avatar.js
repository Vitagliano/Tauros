const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'avatar',
    description: 'Avatar do membro',
    options: [
      {
        name: 'membro',
        type: 'USER',
        description: 'Membro para ver o avatar',
        required: false
      }
    ]
  },
  run: async (client, interaction) => {
    const user = interaction.options.getUser('membro') || interaction.user;

    const embed = new MessageEmbed()
      .setTitle(`Avatar de ${user.username}`)
      .setDescription(
        `Clique [aqui](${user.displayAvatarURL({
          size: 1024,
          dynamic: true
        })}) para baixar a imagem!`
      )
      .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setColor('#f8f8f8')
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
