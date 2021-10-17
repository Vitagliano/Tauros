const { MessageEmbed } = require('discord.js');

const presence = {
  status: {
    dnd: 'Ocupado',
    idle: 'Ausente',
    stream: 'Transmitindo',
    offline: 'Offline',
    online: 'Online'
  },
  activity: {
    type: {
      PLAYING: 'Jogando',
      LISTENING: 'Ouvindo',
      WATCHING: 'Assistindo',
      STREAMING: 'Streamando'
    }
  }
};

module.exports = {
  config: {
    name: 'userinfo',
    aliases: ['user']
  },
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      (await message.guild.members.fetch(args[0])).user ||
      message.author;

    const guild = client.guilds.cache.get(message.guild.id);
    const member = guild.members.cache.get(user.id);

    const embed = new MessageEmbed()
      .setThumbnail(member.displayAvatarURL())
      .setColor('#f8f8f8')
      .addField(`ID  `, member.id)
      .addField(`Username  `, user.username)
      .addField(`Nickname  `, `${member.displayName}`)
      .addField(`Status  `, presence.status[member.presence.status])
      .addField(`Data de Criação  `, `<t:${~~(user.createdTimestamp / 1000)}>`)
      .addField(`Entrou em `, `<t:${~~(member.joinedTimestamp / 1000)}>`)
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
