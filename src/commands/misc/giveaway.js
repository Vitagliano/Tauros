const { MessageEmbed, Permissions } = require('discord.js');
const ms = require('ms');

module.exports = {
  config: {
    name: 'giveaway',
    aliases: ['sorteio']
  },
  run: async (client, message, args) => {
    const howToUse = new MessageEmbed()
      .setTitle(`Sorteio`)
      .setDescription(`Irá iniciar um sorteio.`)
      .setColor('#f8f8f8')
      .addField(
        'Como usar',
        `\`sorteio/giveaway <m para minutos, s para segundos, h para horas> <o que vai ser sorteado>\``
      )
      .addField('Exemplo', `\`<prefixo>sorteio/giveaway 30m Vip\``)
      .addField(
        'Permissão',
        'O staff que for fazer o sorteio tem que possuir a permissão de `Gerenciar Servidor`'
      );

    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
      return message.reply('Você não tem permissão de `Gerenciar Servidor`');

    const sorting = args.slice(1).join(' ');

    if (!args[0] || !sorting) return message.reply({ embeds: [howToUse] });

    const time = ms(args[0]);

    const timeRes = parseInt(Date.now() - time);
    const filter = (r, u) => r.emoji.name === '🎉';

    const embedGiveaway = new MessageEmbed()
      .setTitle('🎉 SORTEIO 🎉')
      .setDescription(`Sorteio de ${sorting}`)
      .addField('Duração', `<t:${~~(timeRes / 1000)}:F>`, true)
      .setColor('#f8f8f8')
      .setFooter('Para participar do sorteio reaja com 🎉!')
      .setTimestamp();

    message.channel.send({ embeds: [embedGiveaway] }).then((msg) => {
      const collector = msg.createReactionCollector({ filter });

      msg.react('🎉');

      collector.on('end', (r) => {
        const reaction = msg.reactions.cache.find((r) => r.emoji.name === '🎉');
        const user = reaction.users.cache.filter((u) => !u.bot);
        const randomUser = user.random();

        if (!randomUser) {
          const embedNobody = new MessageEmbed()
            .setDescription(`Ninguém participou do sorteio! :frowning:`)
            .setColor('#f8f8f8')
            .setTimestamp();

          return msg.edit({
            embeds: [embedNobody]
          });
        } else {
          const embedSucess = new MessageEmbed()
            .setTitle('🎉 SORTEIO ACABOU! 🎉')
            .setDescription(
              `Parabéns **${randomUser}**, você ganhou: \`${sorting}\``
            )
            .setColor('#f8f8f8')
            .setFooter(`ACABOU!`)
            .setTimestamp();

          msg.edit({
            content: `:tada: ${randomUser}, você ganhou!`,
            embeds: [embedSucess]
          });
        }
      });
      setTimeout(() => {
        collector.stop();
      }, time);
    });
  }
};
