require("dotenv-flow").config();

module.exports = {
  owner: process.env.OWNER,
  prefix: process.env.PREFIX,
  mongoURI: process.env.MONGO_URI,
  defaultSettings: {
    prefix: process.env.PREFIX,
    config: {
      deleteMessage: false,
      forbiddenChannelMsg: false,
    },
    leave: {
      enabled: false,
      channel: "bem-vindo",
      message: "Espero te ver novamente {usuario.nome} aqui na {servidor}!"
    },
    welcome: {
      enabled: false,
      channel: "bem-vindo",
      message: "Bem-vindo {usuario.nome} à {servidor}!"
    },
    counter: {
      enabled: false,
      channel: "geral",
      message: "Temos {membros} no servidor"
    },
    autorole: {
      enabled: false,
      roleID: "Membro"
    },
    role: {
      modRole: "Moderator",
      adminRole: "Administrator",
      mutedRole: {
        enabled: false,
        roleID: "Muted"
      }
    },
    channel: {
      punishChannel: {
        enabled: false,
        channelID: "Nenhum"
      },
      newsChannel: {
        enabled: false,
        channelID: "Nenhum"
      },
      logsChannel: {
        enabled: false,
        channelID: "Nenhum"
      },
      commandChannel: {
        enabled: false,
        channelID: "Nenhum"
      }
    }
  }
};
