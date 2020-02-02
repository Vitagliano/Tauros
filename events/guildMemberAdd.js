const guildDB = require("../models/guild");

exports.name = "guildMemberAdd";
exports.run = async (client, member) => {
  const newProfile = {
    guildID: member.guild.id,
    guildName: member.guild.name,
    userID: member.id,
    username: member.user.tag
  };

  try {
    await client.createProfile(newProfile);
  } catch (err) {
    console.error(err);
  }

  try {
    guildDB.findOne({ guildID: member.guild.id }, function(err, doc) {
      if (!doc.autorole.enabled) return;
      if (member.guild.roles.get(doc.autorole.roleID)) {
        member.guild.members.get(member.id).addRole(doc.autorole.roleID);
        doc.save().catch(err => {
          console.log(err);
        });
      } else {
        doc.autorole.enabled = false;
        doc.autorole.roleID = "Membros";
        doc.save();
      }

      if (!doc.welcome.enabled) return;

      if (member.guild.channels.get(doc.welcome.channel)) {
        try {
          member.guild.channels.get(doc.welcome.channel).send(
            doc.welcome.message
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
