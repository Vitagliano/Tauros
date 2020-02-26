const guildDB = require("../models/guild");

module.exports = client => {

    client.blockInvite = async message => {

        const linkRegex = /((discord|invite)\.(gg|io|me|plus|link|io|gg|li)|discordapp\.com\/invite)\/.+/ig;
        let inviteUrl = message.content.match(linkRegex);
        inviteUrl = inviteUrl === null ? '' : inviteUrl[0]
        const inviteCode = inviteUrl.includes('invite/') ? inviteUrl.split('invite/')[1] : inviteUrl.split('/')[1]
        const guildInvites = await message.guild.fetchInvites();

        guildDB.findOne({
            guildID: message.guild.id
        }, async function (err, doc) {
            if (doc.config.antiInvite.enabled && linkRegex.exec(message.content)) {

                console.log('Config habilitada');

                if (doc.config.antiInvite.allowGuildInvites && guildInvites.some(invite => invite.code === inviteCode)) {
                    return console.log('eh da guilda');
                } else {
                    if (doc.config.antiInvite.allowedChannels.some(ch => ch.includes(message.channel.id))) return console.log('parou');
                    console.log('testando regeco', linkRegex.test(message.content));
                    if (linkRegex.test(message.content)) {
                        console.log('a')
                        if (doc.config.antiInvite.deleteInvite) {
                            if (doc.config.antiInvite.sendMessage) {
                                message.delete().then(message.channel.send(doc.config.antiInvite.blockMessage
                                    .replace(/{usuario.id}/g, `<@${message.member.id}>`)
                                    .replace(/{usuario.tagnome}/g, `${message.member.user.tag}`)
                                    .replace(/{usuario.tag}/g, `${message.member.user.discriminator}`)
                                    .replace(/{servidor}/g, `${message.member.guild.name}`)
                                    .replace(/{usuario.nome}/g, `${message.member.user.username}`)
                                    .replace(/{usuarios}/g, `${message.member.guild.members.size}`)
                                ))
                            }
                        } else {
                            if (doc.config.antiInvite.sendMessage) {
                                message.channel.send(doc.config.antiInvite.blockMessage
                                    .replace(/{usuario.id}/g, `<@${message.member.id}>`)
                                    .replace(/{usuario.tagnome}/g, `${message.member.user.tag}`)
                                    .replace(/{usuario.tag}/g, `${message.member.user.discriminator}`)
                                    .replace(/{servidor}/g, `${message.member.guild.name}`)
                                    .replace(/{usuario.nome}/g, `${message.member.user.username}`)
                                    .replace(/{usuarios}/g, `${message.member.guild.members.size}`)
                                )
                            } else return
                        }
                    }
                }
            }
        })
    }


    client.antiCaps = async message => {
        const messageCapsLength = (string) => {
            const regex = /[A-ZÀ-Ý]/g;
            return (string.match(regex) || []).length;
        };
        if (messageCapsLength(message.content) >= 20) return message.reply('não use muita capslock!!!')
    }

    client.antiSpam = async message => {
        if (message.channel.type !== 'text') return;
        try {

            const cooldown = 3;
            const msgTS = message.createdTimestamp;
            const data = [];
            message.channel.fetchMessages()
                .then(m => {
                    const arr = m.array();
                    for (let i = 0; i < arr.length; i++) {
                        if (message.author.id === arr[i].author.id) {
                            data.push(arr[i].createdTimestamp);
                        }
                        if (data.length >= 10) return;
                    }
                })
                .then(() => {
                    const oldTS = data[1];
                    if (msgTS <= oldTS + (cooldown * 1000)) message.delete().then(msg => msg.reply('para de spama porra'));
                })
                .catch(console.error);
        } catch (error) {
            console.log(error);
        }
    }
}