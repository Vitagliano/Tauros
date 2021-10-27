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
    description: 'Informações do membro',
    options: [
      {
        name: 'membro',
        type: 'USER',
        description: 'Membro para ver as informações',
        required: false
      }
    ]
  },
  run: async (client, interaction) => {
    const user = interaction.options.getUser('membro') || interaction.user;

    const guild = client.guilds.cache.get(interaction.guild.id);
    const member = guild.members.cache.get(user.id);

    const embed = new MessageEmbed()
      .setTitle('Informações do membro')
      .setThumbnail(user.displayAvatarURL())
      .setColor('#f8f8f8')
      .addField('ID', user.id, true)
      .addField('Username', user.username, true)
      .addField('Data de Criação', `<t:${~~(user.createdTimestamp / 1000)}>`)
      .setFooter(
        `Requisitado por ${interaction.user.username}`,
        interaction.user.displayAvatarURL()
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

    return interaction.reply({
      embeds: [embed]
    });
  }
};
