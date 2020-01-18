require('dotenv-flow').config();

module.exports = {
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    mongoURI: process.env.MONGO_URI,
    defaultSettings: {
        prefix: process.env.PREFIX,
        leave: {
            enabled: false,
            channel: 'bem-vindo',
            message: 'Espero te ver novamente {{user}} aqui na {{guild}}!',
        },
        welcome: {
            enabled: false,
            channel: 'bem-vindo',
            message: 'Bem-vindo {{user}} à {{guild}}!',
        },
        modRole: 'Moderator',
        adminRole: 'Administrator'
    }
};