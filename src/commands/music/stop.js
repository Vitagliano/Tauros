module.exports = {
  config: {
    name: 'stop',
    aliases: ['parar']
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

    player.destroy();

    message.reply('Parei de tocar nesse servidor');
  }
};
