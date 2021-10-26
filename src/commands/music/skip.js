module.exports = {
  config: {
    name: 'skip',
    aliases: ['pular']
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

    if (!player.queue.current)
      return message.reply({
        content: 'Não tem nenhuma música tocando.'
      });

    const {title} = player.queue.current;

    player.stop();
    message.reply({
      content: `Música \`${title}\` pulada por ${message.member.user}.`
    });
  }
};
