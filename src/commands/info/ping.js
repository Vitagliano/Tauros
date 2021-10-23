module.exports = {
  config: {
    name: 'ping',
    aliases: []
  },
  run: async (client, message, args) => {
    message.reply(`:ping_pong:  ${Math.round(client.ws.ping)}ms`);
  }
};
