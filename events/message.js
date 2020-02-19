const Discord = require("discord.js");
const guildDB = require("../models/guild");
const profileDB = require("../models/profile");

exports.name = "message";
exports.run = async (client, message, member) => {

  if (message.author.bot) return;


  profileDB.countDocuments({userID: message.member.id}, async function (err, count){
    if (count < 1) {
      const newProfile = {
        guildID: message.guild.id,
        guildName: message.guild.name,
        userID: message.member.id,
        username: message.member.user.tag
      };
        
      try {
        await client.createProfile(newProfile);
      } catch (err) {
        console.error(err);
      } 
    }
  })



  // const linkRegex = /((discord|invite)\.(gg|io|me|plus|link|io|gg|li)|discordapp\.com\/invite)\/.+/ig
  // const inviteUrl = message.content.match(linkRegex)[0];
  // const inviteCode = inviteUrl.includes('invite/') ? inviteUrl.split('invite/')[1] : inviteUrl.split('/')[1]
  // const guildInvites = await message.guild.fetchInvites();

  // guildDB.findOne({
  //   guildID: message.guild.id
  // }, async function (err, doc) {
  //   if (doc.config.antiInvite.enabled && linkRegex.exec(message.content)) {

  //     console.log('Config habilitada');

  //     if(doc.config.antiInvite.allowGuildInvites && guildInvites.some(invite => invite.code === inviteCode)) {
  //      return console.log('eh da guilda');
  //     } else {
  //       if (doc.config.antiInvite.allowedChannels.some(ch => ch.includes(message.channel.id))) return console.log('parou');
  //       console.log('testando regeco', linkRegex.test(message.content));
  //       if (linkRegex.test(message.content)) {
  //         console.log('a')
  //         if (doc.config.antiInvite.deleteInvite) {
  //             message.delete().then(message.channel.send(doc.config.antiInvite.blockMessage
  //               .replace(/{usuario.id}/g,`<@${message.member.id}>`)
  //               .replace(/{usuario.tagnome}/g,`${message.member.user.tag}`)
  //               .replace(/{usuario.tag}/g,`${message.member.user.discriminator}`)
  //               .replace(/{servidor}/g,`${message.member.guild.name}`)
  //               .replace(/{usuario.nome}/g,`${message.member.user.username}`)
  //               .replace(/{usuarios}/g,`${message.member.guild.members.size}`)
  //               ))
  //         } else {
  //             message.channel.send(doc.config.antiInvite.blockMessage
  //               .replace(/{usuario.id}/g,`<@${message.member.id}>`)
  //               .replace(/{usuario.tagnome}/g,`${message.member.user.tag}`)
  //               .replace(/{usuario.tag}/g,`${message.member.user.discriminator}`)
  //               .replace(/{servidor}/g,`${message.member.guild.name}`)
  //               .replace(/{usuario.nome}/g,`${message.member.user.username}`)
  //               .replace(/{usuarios}/g,`${message.member.guild.members.size}`)
  //             )
  //         }
  //       }
  //     }
  //   }
  // })


};