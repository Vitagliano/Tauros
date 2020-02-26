const mongoose = require("mongoose");
const { Guild, Profile } = require("../models");

module.exports = client => {
  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    else {
      const newGuild = await client.createGuild(
        {
          guildID: guild.id,
          guildName: guild.name,
          ownerID: guild.owner.id,
          ownerUsername: guild.owner.user.username
        },
        client.config.defaultSettings
      );
      return newGuild;
    }
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);

    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
      else return;
    }

    console.log(
      `Guilda "${data.guildName}" atualizou suas configurações: ${Object.keys(
        settings
      )}`
    );
    return await data.updateOne(settings);
  };

  client.createGuild = async settings => {
    const defaults = Object.assign(
      { _id: mongoose.Types.ObjectId() },
      client.config.defaultSettings
    );
    const merged = Object.assign(defaults, settings);

    const newGuild = await new Guild(merged);
    return newGuild
      .save()
      .then(
        console.log(
          `Configurações padrões salvas para "${merged.guildName}" (${merged.guildID})`
        )
      );
  };

  client.deleteGuild = guild => {
    Guild.deleteOne({ guildID: guild.id }).then(
      console.log(`A guilda "${guild.name}" foi removida! (${guild.id})`)
    );
  };

  client.findChannel = (message, toFind) => {
    toFind = toFind.toLowerCase();
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.find(x =>
        x.name.toLowerCase().startsWith(toFind)
      ) ||
      message.guild.channels.find(x => x.name.toLowerCase() === toFind) ||
      message.guild.channels.get(toFind);
    return channel;
  };

  client.getWelcome = async guild => {
    const data = await Profile.findOne({ welcome: welcome });
    if (data) return data;
    else return;
  };

  client.createProfile = async profile => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);

    const newProfile = await new Profile(merged);
    return newProfile
      .save()
      .then(
        console.log(
          `Perfil de "${merged.username} foi criado" (${merged.userID})`
        )
      );
  };

  client.getProfile = async user => {
    const data = await Profile.findOne({ userID: user.id });
    if (data) return data;
    else return;
  };

  client.updateProfile = async (user, data) => {
    let profile = await client.getProfile(user);

    //if (typeof profile !== "object") profile = {};
    for (const key in data) {
      if (profile[key] !== data[key]) profile[key] = data[key];
      else return;
    }

    console.log(
      `Perfil de "${profile.username}" (${
        profile.userID
      }) foi atualizado: ${Object.keys(data)}`
    );
    return await profile.updateOne(profile);
  };

  client.deleteProfile = async user => {
    Profile.deleteOne({ userID: user.id }).then(
      console.log(`O usuário "${user.user.tag}" teve seus dados removidos da database! (${user.id})`)
    );
  };

  client.clean = text => {
    if (typeof text === "string") {
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
      return text;
    }
  };

  
};
