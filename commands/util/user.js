const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const config = require("../../config.json");

exports.run = async (client, message) => {
  let boti = message.mentions.users.first() || message.author;
  let usuario = message.guild.member(
    message.mentions.users.first() || message.author
  );
  let servers = client.guilds.filter(a => a.members.get(usuario.id));
  servers = servers.map(a => `\`${a.name}\``).join(", ");
  var criado = moment(usuario.createdAt).format("lll");
  var entrou = moment(message.guild.members.get(usuario.id).joinedAt).format(
    "lll"
  );

  let user;
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else {
    user = message.author;
  }

  let administrador;
  if (usuario.hasPermission(`ADMINISTRATOR`) === true) administrador = `Sim`;
  if (usuario.hasPermission(`ADMINISTRATOR`) === false) administrador = `Não`;

  let statusmebro;
  if (usuario.presence.status === `dnd`) statusmebro = `Ocupado`;
  if (usuario.presence.status === `idle`) statusmebro = `Ausente`;
  if (usuario.presence.status === `stream`) statusmebro = `Transmitindo`;
  if (usuario.presence.status === `offline`) statusmebro = `Offine`;
  if (usuario.presence.status === `online`) statusmebro = `Online`;

  let botinfo;
  if (boti.bot === true) botinfo = `Sim`;
  if (boti.bot === false) botinfo = `Não`;

  let roles = usuario.roles.filter(r => r.name !== "@everyone").map(r => r);
  if (roles.length === 0) roles = `\`\`\`js\nSem cargos\`\`\``;

  let member = message.guild.member(user);

  const embed = new Discord.RichEmbed()

    .setColor(config.color)
    .setThumbnail(user.displayAvatarURL)
    .setTitle(`**${user.tag}**`, user.displayAvatarURL)
    .addField(
      `**Nickname  ▸ **`,
      `\`\`\`js\n${
        member.user.username !== null ? `${member.user.username}` : `Sem nick`
      }\`\`\``,
      true
    )
    .addField(`**ID ▸ **`, `\`\`\`js\n${user.id}\`\`\``, true)
    .addField(`**Conta criada em ▸ **`, `\`\`\`js\n${criado}\`\`\``, true)
    .addField(`**Entrou em ▸ **`, `\`\`\`js\n${entrou}\`\`\``, true)
    .addField(`**Bot ▸ **`, `\`\`\`js\n${botinfo}\`\`\``, true)
    .addField(`**Status ▸ **`, `\`\`\`js\n${statusmebro}\`\`\``, true)
    .addField(`**Tag ▸ **`, `\`\`\`js\n#${user.discriminator}\`\`\``, true)
    .addField(`**Administrador ▸ **`, `\`\`\`js\n${administrador}\`\`\``, true)
    .addField(`**Cargos ▸ **`, `**${roles}**`)
    .addField(`**Servidores em comum ▸**`, `**${servers}**`)
    .setFooter(
      `Comando executado por ${message.author.username}`,
      message.author.displayAvatarURL
    )
    .setTimestamp();

  message.channel.send(embed);
};

exports.help = {
  name: "user",
  aliases: ["userinfo"],
  category: "Utilidades"
};
