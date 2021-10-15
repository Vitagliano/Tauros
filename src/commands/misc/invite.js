const { Permissions } = require('discord.js');

module.exports = {
  config: {
    name: 'invite',
    aliases: ['convite']
  },
  run: async (client, message, args) => {
    message.reply(
      `Recomendado: ${client.generateInvite({
        scopes: ['bot'],
        permissions: [Permissions.FLAGS.ADMINISTRATOR]
      })}\nNecessário: ${client.generateInvite({
        scopes: ['bot'],
        permissions: [
          Permissions.FLAGS.SEND_MESSAGES,
          Permissions.FLAGS.EMBED_LINKS,
          Permissions.FLAGS.ADD_REACTIONS,
          Permissions.FLAGS.ATTACH_FILES
        ]
      })}`
    );
  }
};
