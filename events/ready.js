exports.name = 'ready';
const gameLoop = require('../utils/gameLoop');

exports.run = async (client) => {
    gameLoop.run(client);

    const dashboard = require('../website/dashboard');
    client.website = dashboard;
    dashboard.load(client);
    console.log(`O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`);
};
