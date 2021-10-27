module.exports = {
  config: {
    name: 'skip',
    description: 'Pular a musica que está tocando'
  },
  run: async (client, interaction) => {
    const player = client.manager.get(interaction.guild.id);
    if (!player)
      return interaction.reply({
        content: 'Não estou tocando neste servidor.'
      });

    const memberVoiceChannel = interaction.member.voice.channel;
    if (!memberVoiceChannel)
      return interaction.reply({
        content: 'Você precisa estar em um canal de voz para usar este comando.'
      });
    if (memberVoiceChannel.id !== player.voiceChannel)
      return interaction.reply({
        content: 'Você precisa estar no mesmo canal de voz que eu.'
      });

    if (!player.queue.current)
      return interaction.reply({
        content: 'Não tem nenhuma música tocando.'
      });

    const { title } = player.queue.current;

    player.stop();
    interaction.reply({
      content: `Música \`${title}\` pulada por ${interaction.member.user}.`
    });
  }
};
