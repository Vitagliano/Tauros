module.exports = {
  config: {
    name: 'stop',
    description: 'Parar de tocar música'
  },
  run: async (client, interaction) => {
    const player = client.manager.get(interaction.guild.id);

    if (!player)
      return interaction.reply({
        content: 'Não estou tocando neste servidor.'
      });

    if (!interaction.member.voice.channel)
      return interaction.reply({
        content:
          'Você precisa estar em um canal de voz para utilizar este comando!'
      });

    if (
      interaction.guild.me.voice.channel &&
      interaction.guild.me.voice.channel.id !==
        interaction.member.voice.channel.id
    )
      return interaction.reply({
        content:
          'Você precisa estar no mesmo canal de voz que eu para utilizar este comando!'
      });

    player.destroy();

    interaction.reply('Parei de tocar nesse servidor');
  }
};
