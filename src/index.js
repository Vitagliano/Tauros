const Client = require('./Client');

const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MEMBERS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_PRESENCES',
    'GUILD_VOICE_STATES'
  ],
  presence: {
    status: 'dnd'
  }
});

client
  .connectDatabase()
  .then(() => console.log('[DATABASE] Conectado ao Mongo'))
  .catch(console.log);

client.login(process.env.TOKEN);
