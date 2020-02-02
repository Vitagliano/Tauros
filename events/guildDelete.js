exports.name = "guildDelete"

exports.run = async (client, guild) => {
    try {
        await client.deleteGuild(guild);
    } catch (error) {
        console.error(error);
    }
};