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
    PLAYING: 'Jogando',
    LISTENING: 'Ouvindo',
    WATCHING: 'Assistindo',
    STREAMING: 'Streamando'
  }
};

module.exports = {
  config: {
    name: 'userinfo',
    aliases: ['user']
  },
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const guild = client.guilds.cache.get(message.guild.id);
    const member = guild.members.cache.get(user.id);

    const embed = new MessageEmbed()
      .setThumbnail(user.displayAvatarURL())
      .setColor('#f8f8f8')
      .addField(`ID`, user.id, true)
      .addField(`Username`, user.username, true)
      .addField(`Status`, presence.status[member.presence.status])
      .addField(`Data de Criação`, `<t:${~~(user.createdTimestamp / 1000)}>`)
      .addField(`Entrou em`, `<t:${~~(member.joinedTimestamp / 1000)}>`)
      .setFooter(
        `Requisitado por ${message.author.username}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    if (member.displayName !== user.username)
      embed.addField(`Nickname`, `${member.displayName}`);

    let activity = member.presence.activities[0];

    if (activity) {
      if (activity.type === 'CUSTOM') activity = member.presence.activities[1];
      if (!activity) return;

      embed.addField(
        'Atividade',
        `${presence.activity[activity.type]} ${activity.name}`,
        true
      );
    }

    return message.reply({
      embeds: [embed]
    });
  }
};
