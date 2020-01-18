exports.name = 'guildCreate';
exports.run = async (client, guild) => {
    const newGuild = {
        guildID: guild.id,
        guildName: guild.name,
        ownerID: guild.ownerID,
        ownerUsername: guild.owner.user.tag
    };

    try {
        await client.createGuild(newGuild);
    } catch (error) {
        console.error(error);
    }
};