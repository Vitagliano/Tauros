module.exports = async client => {
  console.log(`[BOT] ${client.user.tag} está online`);
  client.manager.init(client.user.id);
  client.application.commands.set([...client.slash.map(i => i.config)]);
};
