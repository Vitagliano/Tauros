module.exports = {
  config: {
    name: 'volume',
    aliases: []
  },
  run: async (client, message, args) => {
    const player = client.manager.get(message.guild.id);

    if (!player)
      return message.reply({
        content: 'Não estou tocando neste servidor.'
      });

    if (!message.member.voice.channel)
      return message.reply({
        content: 'Você precisa estar em um canal de voz para utilizar este comando!'
      });

    if (
      message.guild.me.voice.channel &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.reply({
        content: 'Você precisa estar no mesmo canal de voz que eu para utilizar este comando!'
      });

    if (!args.length)
      return message.reply(`Volume atual: \`${player.volume}\``);

    const volume = Number(args[0]);

    if (!volume || volume < 1 || volume > 100)
      return message.reply('Defina um volume de `1 a 100`.');

    player.setVolume(volume);
  }
};
