const axios = require('axios').default;

const applications = {
  youtube: '880218394199220334',
  poker: '755827207812677713',
  pesca: '814288819477020702',
  xadrez: '832012774040141894'
};

module.exports = {
  config: {
    name: 'together',
    aliases: []
  },
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channelId;
    if (!voiceChannel) return message.reply('Entre em um canal de voz');

    if (!args[0])
      return message.reply(
        `Escolha entre \`${Object.keys(applications).join(', ')}\``
      );

    const request = await axios.post(
      `https://discord.com/api/v8/channels/${voiceChannel}/invites`,
      {
        max_age: 86400,
        max_uses: 0,
        target_application_id: applications[args[0]],
        target_type: 2,
        temporary: false,
        validate: null
      },
      {
        headers: {
          Authorization: `Bot ${client.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    message.reply(`https://discord.gg/${request.data.code}`);
  }
};
