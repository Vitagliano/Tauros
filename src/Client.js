const { Client, Collection } = require('discord.js');
const { connect } = require('mongoose');

module.exports = class extends Client {
  constructor(options) {
    super(options);

    this.loadHandlers();
  }

  loadHandlers() {
    ['commands', 'aliases'].forEach((f) => (this[f] = new Collection()));
    ['commands', 'events'].forEach((f) => require(`./handlers/${f}`)(this));
  }

  connectDatabase() {
    return connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  }
};
