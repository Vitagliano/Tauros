const guildDB = require("../models/guild");
const profileDB = require("../models/profile");

exports.name = "guildMemberRemove";
exports.run = async (client, member) => {
  try {
    profileDB.findOne({ guildID: member.guild.id }, async function(err, doc) {
      await client.deleteProfile(member);
    });
  } catch (err) {
    console.error(err);
  }

  try {
    guildDB.findOne({ guildID: member.guild.id }, function(err, doc) {
      if (!doc.leave.enabled) return;

      if (member.guild.channels.get(doc.leave.channel)) {
        try {
          member.guild.channels.get(doc.leave.channel).send(
            doc.leave.message
              .replace(/{usuario.id}/g, `<@${member.id}>`)
              .replace(/{usuario.tagnome}/g, `${member.user.tag}`)
              .replace(/{usuario.tag}/g, `${member.user.discriminator}`)
              .replace(/{servidor}/g, `${member.guild.name}`)
              .replace(/{usuario.nome}/g, `${member.user.username}`)
              .replace(/{usuarios}/g, `${member.guild.members.size}`)
          );
        } catch (err) {
          console.log(err);
        }
      }

      if (doc.counter) {
        if (doc.counter.channel) {
          if (!doc.counter.enabled) return;

          const n0 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "0_redblue");
          const n1 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "1_redblue");
          const n2 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "2_redblue");
          const n3 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "3_redblue");
          const n4 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "4_redblue");
          const n5 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "5_redblue");
          const n6 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "6_redblue");
          const n7 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "7_redblue");
          const n8 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "8_redblue");
          const n9 = client.guilds
            .get("664669230284800000")
            .emojis.find(o => o.name === "9_redblue");

          let membros = `${client.guilds
            .get(member.guild.id)
            .memberCount.toString()}`;
          let counter = membros
            .split("")
            .map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i])
            .join("");
          client.guilds
            .get(member.guild.id)
            .channels.find(r => doc.counter.channel.includes(r.id))
            .setTopic(doc.counter.message.replace("{membros}", `${counter}`));
        } else {
        }
      }
    });
  } catch (err) {
    console.log("");
  }
};
