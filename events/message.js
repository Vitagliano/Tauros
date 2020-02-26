const Discord = require("discord.js");
const guildDB = require("../models/guild");
const profileDB = require("../models/profile");


const timexp = new Set();

// let array = []

// function checkSpam() {
//   const matches = array.filter(obj => obj.author == message.author.id - 1).length
//   if (matches >= 3) return ban()
//   if (matches < 3 && matches >= 1) return warn()
// }

// function ban() {
//   return message.reply('Anti-spam ativo!')
// }

// async function warn() {
//   user.warns += 1
//   await user.save()
// }

exports.name = "message";
exports.run = async (client, message, member) => {

  if (message.author.bot) return;

  // checkSpam()

  // array.push({
  //   'author': message.author.id
  // })

  // setTimeout(setTimeout(array.sort(obj => obj.author == message.author.id).shift), 5000)

  profileDB.countDocuments({
    userID: message.member.id
  }, async function (err, count) {
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

  try {
    await client.blockInvite(message);
  } catch (error) {
    console.error(error);
  }

  try {
    await client.antiCaps(message);
  } catch (error) {
    console.error(error)
  }

  // try {
  //   await client.antiSpam(message);
  // } catch (error) {
  //   console.error(error)
  // }


  // const linkRegex = /((discord|invite)\.(gg|io|me|plus|link|io|gg|li)|discordapp\.com\/invite)\/.+/ig;
  // let inviteUrl = message.content.match(linkRegex);
  // inviteUrl = inviteUrl === null ? '' : inviteUrl[0]
  // const inviteCode = inviteUrl.includes('invite/') ? inviteUrl.split('invite/')[1] : inviteUrl.split('/')[1]
  // const guildInvites = await message.guild.fetchInvites();

  // guildDB.findOne({
  //   guildID: message.guild.id
  // }, async function (err, doc) {
  //   if (doc.config.antiInvite.enabled && linkRegex.exec(message.content)) {

  //     console.log('Config habilitada');

  //     if (doc.config.antiInvite.allowGuildInvites && guildInvites.some(invite => invite.code === inviteCode)) {
  //       return console.log('eh da guilda');
  //     } else {
  //       if (doc.config.antiInvite.allowedChannels.some(ch => ch.includes(message.channel.id))) return console.log('parou');
  //       console.log('testando regeco', linkRegex.test(message.content));
  //       if (linkRegex.test(message.content)) {
  //         console.log('a')
  //         if (doc.config.antiInvite.deleteInvite) {
  //           if (doc.config.antiInvite.sendMessage) {
  //             message.delete().then(message.channel.send(doc.config.antiInvite.blockMessage
  //               .replace(/{usuario.id}/g, `<@${message.member.id}>`)
  //               .replace(/{usuario.tagnome}/g, `${message.member.user.tag}`)
  //               .replace(/{usuario.tag}/g, `${message.member.user.discriminator}`)
  //               .replace(/{servidor}/g, `${message.member.guild.name}`)
  //               .replace(/{usuario.nome}/g, `${message.member.user.username}`)
  //               .replace(/{usuarios}/g, `${message.member.guild.members.size}`)
  //             ))
  //           }
  //         } else {
  //           if (doc.config.antiInvite.sendMessage) {
  //             message.channel.send(doc.config.antiInvite.blockMessage
  //               .replace(/{usuario.id}/g, `<@${message.member.id}>`)
  //               .replace(/{usuario.tagnome}/g, `${message.member.user.tag}`)
  //               .replace(/{usuario.tag}/g, `${message.member.user.discriminator}`)
  //               .replace(/{servidor}/g, `${message.member.guild.name}`)
  //               .replace(/{usuario.nome}/g, `${message.member.user.username}`)
  //               .replace(/{usuarios}/g, `${message.member.guild.members.size}`)
  //             )
  //           } else return
  //         }
  //       }
  //     }
  //   }
  // })

  if (timexp.has(message.author.id)) return;
  timexp.add(message.author.id);
  setTimeout(() => {
    timexp.delete(message.author.id);
  }, 5000);
  profileDB.findOne({
      userID: message.author.id
    },
    function (erro, doc) {
      if (doc) {
        doc.xp += Math.floor(Math.random() * 9) + 1;
        if (doc.xp > doc.level * 1000) {
          doc.level += 1;
          doc.xp = 0;
          message.channel
            .send(
              `${message.author}, você upou para o level ${doc.level}!`
            )
            .then(msg => msg.delete(8000));
        }
        doc.save();
      }
    }
  );
};