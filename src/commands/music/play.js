module.exports = {
  config: {
    name: 'play',
    aliases: ['tocar']
  },
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.reply({
        content:
          'Você precisa estar em um canal de voz para utilizar este comando!'
      });
    if (
      message.guild.me.voice.channel &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.reply({
        content:
          'Você precisa estar no mesmo canal de voz que eu para utilizar este comando!'
      });

    const search = args.join(' ');
    if (!search) return message.reply('digite o nome da musica');

    let res;

    try {
      res = await client.manager.search(search, message.member.user);

      if (res.loadType === 'LOAD_FAILED') throw res.exception;
      else if (res.loadType === 'PLAYLIST_LOADED')
        // eslint-disable-next-line no-throw-literal
        throw { message: 'Playlists não são suportadas neste comando.' };
    } catch (err) {
      return message.reply({
        content: `Aconteceu um erro ao tentar buscar a música: ${err.message}`
      });
    }

    if (!res?.tracks?.[0])
      return message.reply({
        content: 'Música não encontrada!'
      });

    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id
    });

    if (player.state !== 'CONNECTED') player.connect();
    player.queue.add(res.tracks[0]);

    if (!player.playing && !player.paused) player.play();

    return message.reply({
      content: `\`${res.tracks[0].title}\` adicionada à fila.`
    });
  }
};
