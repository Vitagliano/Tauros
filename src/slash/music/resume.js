module.exports = {
  config: {
    name: 'resume',
    description: 'Resumir a musica pausada'
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

    if (!player.paused)
      return interaction.reply({
        content: 'A música não está pausada!'
      });

    player.pause(false);
    interaction.reply({ content: 'Música resumida!' });
  }
};
