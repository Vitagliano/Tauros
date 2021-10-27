module.exports = {
  config: {
    name: 'pause',
    description: 'Pausar música'
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

    if (player.paused)
      return interaction.reply({
        content: 'A música já está pausada!'
      });

    player.pause(true);
    interaction.reply({ content: 'Música pausada!' });
  }
};
