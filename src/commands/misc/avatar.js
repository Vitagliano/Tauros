const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'avatar',
    aliases: []
  },
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      (await message.guild.members.fetch(args[0])).user ||
      message.author;

    const embed = new MessageEmbed()
      .setAuthor(`Avatar de ${user.username}`)
      .setDescription(
        `Clique [aqui](${user.displayAvatarURL({
          size: 1024,
          dynamic: true
        })}) para baixar a imagem!`
      )
      .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setColor('#f8f8f8')
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
