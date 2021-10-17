const Guild = require('../../models/Guild');
const { Permissions } = require('discord.js');
module.exports = {
  config: {
    name: 'setprefix',
    aliases: []
  },
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return message.reply('Você não tem permissão de `gerenciar servidor`');

    const newPrefix = args[0];
    if (!newPrefix) return message.reply('Você não colocou o novo prefixo');

    Guild.findOneAndUpdate(
      { _id: message.guild.id },
      {
        $set: {
          prefix: newPrefix
        }
      },
      (err) => {
        if (err) return console.log(err);
      }
    )
      .then((guild) =>
        message.reply(`O prefixo foi atualizado para \`${guild.prefix}\``)
      )
      .catch(() => message.reply('Aconteceu um erro ao mudar o prefixo'));
  }
};
