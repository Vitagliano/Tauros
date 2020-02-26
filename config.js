require('dotenv-flow').config();

module.exports = {
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    mongoURI: process.env.MONGO_URI,
    defaultSettings: {
        prefix: process.env.PREFIX,
        config: {
            deleteMessage: false,
            forbiddenChannelMsg: false,
            botName: 'Tauros',
            setAdmin: false,
            setMod: false,
            setDJ: false,
            autoRole: { 
                enabled: false 
            },
            messages: {
                enabled: false,
                welcome: {
                    enabled: false,
                    message: '👋 Bem-vindo {usuario.nome} à {servidor}!'
                },
                leave: {
                    enabled: false,
                    message: 'Espero te ver novamente {usuario.nome} aqui na {servidor}!'
                }
            },
            antiInvite: {
                enabled: false,
                allowGuildInvites: false,
                deleteInvite: false,
                sendMessage: false,
                blockMessage: '{usuario.nome} você não pode enviar convites aqui!'
            },
            starBoard: {
                enabled: false,
                minStars: '1'
            },
            moderation: {
                enabled: false,
                sendMessage: false,
                punishMessage: '**Usuário punido:** {usuario.nome}\n**Punido por** {@staff}\n**Motivo:** {reason}',
                autoMod: {
                    enabled: false
                }
            }
        },
        counter: {
            enabled: false,
            channel: 'geral',
            message: 'Temos {membros} no servidor'
        },
        role: {
            modRole: 'Moderator',
            adminRole: 'Administrator',
            mutedRole: {
                enabled: false,
                roleID: 'Muted'
            }
        },
        channel: {
            punishChannel: {
                enabled: false,
                channelID: 'Nenhum'
            },
            newsChannel: {
                enabled: false,
                channelID: 'Nenhum'
            },
            logsChannel: {
                enabled: false,
                channelID: 'Nenhum'
            },
            commandChannel: {
                enabled: false,
                channelID: 'Nenhum'
            }
        }
    }
};
