exports.name = "guildDelete"

exports.run = async (database, guild) => {
	database.deleteOne({ guildID: guild.id }, (err) => {
		if(err) console.log(err);
	});
};