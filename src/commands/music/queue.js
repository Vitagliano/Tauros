const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'queue',
    aliases: []
  },
  run: async (client, message, args) => {
    const player = client.manager.get(message.guild.id);
    if (!player)
      return message.reply({
        content: 'Não estou tocando neste servidor.'
      });

    const queue = player.queue;

    const embed = new MessageEmbed()
      .setTitle(`Fila de músicas do servidor`)
      .setColor('#f8f8f8')
      .setFooter(
        `Requisitado por ${message.author.username}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    const tracks = queue.slice(0, 10);

    if (queue.current)
      embed.addField(
        `Tocando agora:`,
        `[${queue.current.title}](${queue.current.uri})`
      );

    if (!tracks.length) embed.setDescription(`Não há nenhuma música na fila.`);
    else
      embed.setDescription(
        tracks
          .map((t, i) => {
            return `${i + 1} - [${t.title}](${t.uri})`;
          })
          .join('\n')
      );

    message.reply({ embeds: [embed] });
  }
};
