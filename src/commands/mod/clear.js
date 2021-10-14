const { Permissions } = require('discord.js');

module.exports = {
  config: {
    name: 'clear',
    aliases: ['limpar']
  },
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return message.reply('Não tenho permissão de `gerenciar mensagens`');

    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return message.reply(
        `${member.user.tag} Você não tem a permissão de \`gerenciar mensagens\``
      );

    const amount = parseInt(args[0]);

    if (!amount)
      return message.reply(
        'Você precisa especificar a quantidade de mensagens para deletar, `2 - 100`'
      );

    if (amount < 2)
      return message.reply('Não posso apagar menos que `2` mensagens');

    if (amount > 100)
      return message.reply('Não posso apagar mais que `100` mensagens');

    message.channel.messages
      .fetch({
        limit: amount
      })
      .then((messages) => {
        message.channel
          .bulkDelete(messages)
          .then(() => message.channel.send(`Apaguei \`${amount}\` mensagens`))
          .catch(() =>
            message.channel.send('Houve um erro em apagar as mensagens')
          );
      });
  }
};
