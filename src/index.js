const Client = require('./Client');

const client = new Client({
  intents: [32767]
});

client
  .connectDatabase()
  .then(() => console.log('[DATABASE] Conectado ao Mongo'))
  .catch(console.log);

client.login(process.env.TOKEN);
