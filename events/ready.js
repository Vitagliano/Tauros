exports.name = 'ready';
const gameLoop = require('../utils/gameLoop');
const guildsDB = require('../models/guild');
const muteDB = require('../models/mute');
const Discord = require('discord.js');
const config = require('../config.json');

exports.run = async client => {
    gameLoop.run(client);

    const dashboard = require('../website/dashboard');
    client.website = dashboard;
    dashboard.load(client);
    console.log(
        `O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`
    );

    // async function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // setInterval(async () => {
    //   let guilds = client.guilds.array();
    //   for(var i = 0, length = guilds.length; i < length; i++) {
    //     let guild = guilds[i];
    //     let botMember = guild.me;
    //     guildsDB.findOne({ guildID: guild.id }, async function(err, doc) {
    //       if (doc.config.botName !== 'Tauros') {
    //           console.log(`O bot na guilda ${doc.guildID} mudou de nick para ${doc.config.botName}`)
    //         botMember.guild.me.setNickname(doc.config.botName);
    //       }
    //     })
    //     await sleep(Math.floor(Math.random() * 6) * 1000);
    //   }
    // }, 60000)

    setInterval(async () => {
        const mutes = await muteDB.Mute.find({});
        for (const i in mutes) {
            if (Date.now() > mutes[i].muted.time) {
                const docGuild = await guildsDB.findOne({
                    guildID: mutes[i].guildID
                });
                const member = await client.guilds
                    .get(mutes[i].guildID)
                    .fetchMember(mutes[i].userID);

                if (member.roles.has(docGuild.role.mutedRole.roleID)) {
                    const memberMute = await client.fetchUser(mutes[i].userID);
                    let muteembed = new Discord.RichEmbed()
                        .setDescription(`**Desmute**`)
                        .setColor(config.color)
                        .addField('Usuário', memberMute.username, true)
                        .setThumbnail(memberMute.displayAvatarURL, true)
                        .setFooter(memberMute.username)
                        .setTimestamp();
                    const guild = client.guilds.get(mutes[i].guildID);

                    const channel = guild.channels.get(
                        docGuild.channel.punishChannel.channelID
                    );

                    channel.send(muteembed);
                    member
                        .removeRole(docGuild.role.mutedRole.roleID)
                        .then(async () => {
                            await muteDB.Mute.deleteOne({
                                userID: mutes[i].userID
                            });
                        });
                }
            }
        }
    }, 5000);
};
