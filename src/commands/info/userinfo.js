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
      .setTitle('Informações do membro')
      .setThumbnail(user.displayAvatarURL())
      .setColor('#f8f8f8')
      .addField('ID', user.id, true)
      .addField('Username', user.username, true)
      .addField('Data de Criação', `<t:${~~(user.createdTimestamp / 1000)}>`)
      .setFooter(
        `Requisitado por ${message.author.username}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    if (member.displayName !== user.username)
      embed.addField('Nickname', `${member.displayName}`);

    if (member.presence) {
      embed.addField('Status', presence.status[member.presence.status]);

      let activity = member.presence.activities[0];

      if (activity) {
        if (activity.type === 'CUSTOM')
          // eslint-disable-next-line prefer-destructuring
          activity = member.presence.activities[1];
        if (!activity) return;

        embed.addField(
          'Atividade',
          `${presence.activity[activity.type]} ${activity.name}`,
          true
        );
      }
    }

    return message.reply({
      embeds: [embed]
    });
  }
};
