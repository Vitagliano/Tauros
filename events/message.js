const Discord = require("discord.js");
const Profile = require("../models/profile");
const config = require("../config.json");
const msgXP = new Map();

exports.name = "message";
exports.run = async (client, message, member) => {
  if (message.author.bot) return;
  // Coins;

  // const messageCheck = Math.floor(Math.random() * 10) + 1;
  // const coinAmount = Math.floor(Math.random() * 4) + 1;
  // console.log("messageCheck", messageCheck, "coinCheck", coinAmount);

  // if (messageCheck >= 100 && messageCheck <= 150) {
  //   try {
  //     await updateCoins(client, message.member, coinAmount);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // async function updateCoins(client, member, amount) {
  //   const newProfile = {
  //     guildID: member.guild.id,
  //     guildName: member.guild.name,
  //     userID: member.id,
  //     username: member.user.tag
  //   };

  //   const profile = await client.getProfile(member);
  //   if (!profile) await client.createProfile(newProfile);
  //   const newAmount = profile ? profile.coins + amount : amount;
  //   await client.updateProfile(member, { coins: newAmount });
  //   console.log(`Updated: ${newAmount}`);
  // }

};
