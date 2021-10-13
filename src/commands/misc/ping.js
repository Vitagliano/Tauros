module.exports = {
  config: {
    name: 'ping',
    aliases: []
  },
  run: async (client, message, args) => {
    message.reply({
      content: `:ping_pong:  ${Math.round(client.ws.ping)}ms`
    });
  }
};
