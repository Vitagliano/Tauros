const { Permissions } = require('discord.js');

module.exports = {
  config: {
    name: 'kick',
    aliases: ['expulsar', 'kickar']
  },
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return message.reply('Não tenho permissão de `expulsar membros`');

    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return message.reply(
        `${member.user.tag} Você não tem a permissão de \`expulsar membros\``
      );

    if (!member) return message.reply('Mencione um membro para ser expulso');

    if (member) {
      if (member.user === message.author)
        return message.reply('Você não pode expulsar a si mesmo');

      if (
        member.roles.highest.rawPosition >=
        message.guild.me.roles.highest.rawPosition
      ) {
        message.reply(`Esse membro tem um cargo maior que o meu`);
      } else {
        message
          .reply(`Deseja expulsar o membro: \`${member.user.tag}\`?`)
          .then((msg) => {
            const filter = (reaction, user) => {
              return (
                reaction.emoji.name === '✅' && user.id === message.author.id
              );
            };

            const collector = msg.createReactionCollector({
              filter,
              max: 1,
              time: 60 * 1000
            });

            msg.react('✅');

            collector.on('collect', () => {
              member.kick();
              msg.edit(`Sucesso em expulsar o membro: \`${member.user.tag}\``);
            });
          });
      }
    }
  }
};
