const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'userinfo',
    aliases: ['user']
  },
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      (await message.guild.members.fetch(args[0])).user ||
      message.author;
    let guild = client.guilds.cache.get(message.guild.id);
    let member = guild.members.cache.get(user.id);

    const embed = new MessageEmbed()
      .setThumbnail(member.displayAvatarURL())
      .setColor('#f8f8f8')
      .addField(`**Username  **`, user.username)
      .addField(`**ID  **`, member.id.toString())
      .addField(
        `**Data de Criação ** `,
        `<t:${~~(new Date(user.createdAt).getTime() / 1000)}>`
      )
      .addField(
        `**Entrou em **`,
        `<t:${~~(new Date(member.joinedAt).getTime() / 1000)}>`
      )
      .addField(`**Nickname  **`, `${member.displayName}`)
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
