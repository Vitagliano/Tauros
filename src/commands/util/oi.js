module.exports = {
  config: {
    name: 'oi',
    aliases: ['ola', 'eae']
  },
  run: async (client, message, args) => {
    message.reply('olá camarada');
  }
};
