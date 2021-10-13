const { Client, Collection } = require('discord.js');
const { connect } = require('mongoose');

const User = require('./models/User');

module.exports = class extends Client {
  constructor(options) {
    super(options);

    this.loadHandlers();
    this.db = {
      user: User,
      guild: null,
    };
  }

  loadHandlers() {
    ['commands', 'aliases'].forEach(f => (this[f] = new Collection()));
    ['commands', 'events'].forEach(f => require(`./handlers/${f}`)(this));
  }

  connectDatabase() {
    return connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
};
