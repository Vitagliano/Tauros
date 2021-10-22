module.exports = {
  config: {
    name: 'pause',
    aliases: []
  },
  run: async (client, message, args) => {
    const player = client.manager.get(message.guild.id);
    if (!player)
      return message.reply({
        content: 'Não estou tocando neste servidor.'
      });

    const memberVoiceChannel = message.member.voice.channel;
    if (!memberVoiceChannel)
      return message.reply({
        content: 'Você precisa estar em um canal de voz para usar este comando.'
      });
    if (memberVoiceChannel.id !== player.voiceChannel)
      return message.reply({
        content: 'Você precisa estar no mesmo canal de voz que eu.'
      });

    if (player.paused)
      return message.reply({
        content: 'A música já está pausada!'
      });

    player.pause(true);
    message.reply({ content: 'Música pausada!' });
  }
};
