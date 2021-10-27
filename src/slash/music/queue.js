const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'queue',
    description: 'Fila de músicas do servidor'
  },
  run: async (client, interaction) => {
    const player = client.manager.get(interaction.guild.id);
    if (!player)
      return interaction.reply({
        content: 'Não estou tocando neste servidor.'
      });

    const { queue } = player;

    const embed = new MessageEmbed()
      .setTitle('Fila de músicas do servidor')
      .setColor('#f8f8f8')
      .setFooter(
        `Requisitado por ${interaction.username}`,
        interaction.displayAvatarURL()
      )
      .setTimestamp();

    const tracks = queue.slice(0, 10);

    if (queue.current)
      embed.addField(
        'Tocando agora:',
        `[${queue.current.title}](${queue.current.uri})`
      );

    if (!tracks.length) embed.setDescription('Não há nenhuma música na fila.');
    else
      embed.setDescription(
        tracks.map((t, i) => `${i + 1} - [${t.title}](${t.uri})`).join('\n')
      );

    interaction.reply({ embeds: [embed] });
  }
};
