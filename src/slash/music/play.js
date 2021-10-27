module.exports = {
  config: {
    name: 'play',
    description: 'Tocar música',
    options: [
      {
        name: 'musica',
        type: 'STRING',
        description: 'Nome da música para ser tocada',
        required: true
      }
    ]
  },
  run: async (client, interaction) => {
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

    const search = interaction.options.getString('musica');

    let res;

    try {
      res = await client.manager.search(search, interaction.member.user);

      if (res.loadType === 'LOAD_FAILED') throw res.exception;
      else if (res.loadType === 'PLAYLIST_LOADED')
        // eslint-disable-next-line no-throw-literal
        throw { message: 'Playlists não são suportadas neste comando.' };
    } catch (err) {
      return interaction.reply({
        content: `Aconteceu um erro ao tentar buscar a música: ${err.message}`
      });
    }

    if (!res?.tracks?.[0])
      return interaction.reply({
        content: 'Música não encontrada!'
      });

    const player = client.manager.create({
      guild: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id
    });

    if (player.state !== 'CONNECTED') player.connect();
    player.queue.add(res.tracks[0]);

    if (!player.playing && !player.paused) player.play();

    return interaction.reply({
      content: `\`${res.tracks[0].title}\` adicionada à fila.`
    });
  }
};
