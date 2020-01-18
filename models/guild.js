const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    ownerID: String,
    ownerUsername: String,
    prefix: String,
    leave: {
		enabled: Boolean,
		channel: String,
		message: String,
	},
	welcome: {
		enabled: Boolean,
		channel: String,
		message: String,
	},
    modRole: String,
    adminRole: String
});

module.exports = mongoose.model('Guild', guildSchema);