const Discord = require('discord.js');
const config = require('../../../config.json');

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const attacks = {
    soco: {
        damage: {
            min: 5.0,
            max: 7.0
        },
        attackChance: 0.75,
        messages: [
            'levou um soco na barriga de',
            'levou um soco na cara de',
            'levou um soco nas costas de'
        ]
    },
    chute: {
        damage: {
            min: 6.0,
            max: 10.0
        },
        attackChance: 0.60,
        messages: [
            'levou um chute na bunda de',
            'foi chutado e caiu no chão por',
            'levou um chute na cabeça de'
        ]
    },
    empurrão: {
        damage: {
            min: 9.0,
            max: 20.0
        },
        attackChance: 0.35,
        messages: [
            'levou um empurrão de',
            'saiu voando com a força do empurrão de',
            'quebrou uma parede ao ser empurrado com força por'
        ]
    }
};

const validActions = Object.keys(attacks).concat('sair');
const validActionRegex = new RegExp(validActions.join('|'), 'i');
const validActionString = validActions.map(action => `**${action}**`).join('\n ');

class Player {
    constructor(user) {
        if (Player.cache[user.id]) {
            return Player.cache[user.id];
        }

        Player.cache[user.id] = this;

        this.user = user;

        this.reset();
    }

    reset() {
        this.hp = 100;
        this.isFighting = false;
        this.miss = 0;
    }

    debug() {
        console.log(`${this.user.username}'s HP: ${this.hp}`);
    }
}

Player.cache = {};

const generateMessage = () => Object.keys(attacks).map(name => {
    const attack = attacks[name];
    return `**${name}**\nDano: \`${attack.damage.min}-${attack.damage.max}\`\nPrecisão: \`${Math.floor(attack.attackChance * 100)}%\``;
}).join('\n\n');

exports.run = (client, message, args) => {
    const name = client.commands.get('fight').help.name;
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)

    if (args[0] === 'ajuda') {
        const embed = new Discord.RichEmbed()
            .setTitle(`${nameCapitalized}`)
            .setDescription(client.commands.get('fight').help.description)
            .addField('Como usar:', `${config.prefix}${client.commands.get('fight').help.usage}`)
            .addField('Aliases:', `${client.commands.get('fight').help.aliases}`)
            .setColor(config.color)
        message.channel.send({embed})
        return;
    } 

    if (args[0] === 'info') {
        message.author.send(generateMessage());
        const embed = new Discord.RichEmbed()
        .setDescription(`:crossed_swords: As informações sobre ataque foram enviadas via DM!`)
        .setColor(config.color)
        message.channel.send({embed})
        return;
    }

    const mention = message.mentions.users.first();

    if (!mention) {
        const embed = new Discord.RichEmbed()
        .setDescription('Mencione um usuário para lutar')
        .setColor(config.color);
        message.channel.send({ embed });
    }

    if (mention.bot) {
        const embed = new Discord.RichEmbed()
        .setDescription('Você não pode lutar contra um bot')
        .setColor(config.color);
        message.channel.send({ embed });
    }

    if (mention.id === message.author.id) {
        const embed = new Discord.RichEmbed()
        .setDescription('Você não pode lutar contra si mesmo!')
        .setColor(config.color);
        message.channel.send({ embed });
    }

    const you = new Player(message.author);
    if (you.isFighting) {
        const embed = new Discord.RichEmbed()
        .setDescription('Você já está em uma luta!')
        .setColor(config.color);
        message.channel.send({ embed });
    }

    const opponent = new Player(mention);
    if (opponent.isFighting) {         
        const embed = new Discord.RichEmbed()
        .setDescription('Seu adversario já está em uma luta!')
        .setColor(config.color);
        message.channel.send({ embed });
    }

    you.isFighting = true;
    opponent.isFighting = true;

    fight(message, you, opponent, true);
};

const fight = (message, player1, player2, turn) => {
    if (!player1.isFighting || !player2.isFighting) {
        // Se nenhum dos dois estiver jogado reseta o status.
        player1.reset();
        player2.reset();

        return;
    }

    const currentPlayer = turn ? player1 : player2;
    const targetPlayer = turn ? player2 : player1;

    
    const embed = new Discord.RichEmbed()
    .setTitle(`**${currentPlayer.user.username}**, é seu turno.`)
    .setDescription(`Escolha uma das opções abaixo e digite no chat: \n ${validActionString} `)
    .setThumbnail('https://i.imgur.com/TwTKFPn.png')
    .setColor(config.color);
    message.channel.send({ embed });
    message.channel.awaitMessages(response => response.author.id === currentPlayer.user.id && validActionRegex.test(response.content), {
        max: 1,
        time: 30000,
        errors: ['time'],
    }).then(collected => {
        const msg = collected.first();
        const input = msg.content.toLowerCase();

        if (input === 'sair') {
            const embed = new Discord.RichEmbed()
            .setDescription(`**${currentPlayer.user.username}** desistiu do jogo para **${targetPlayer.user.username}**!`)
            .addField('**Vencedor**', targetPlayer.user.username, true)
            .addField('**Desistencia**', currentPlayer.user.username, true)
            .setThumbnail('https://i.imgur.com/3QzRsxB.png')
            .setColor(config.color);
            msg.channel.send({ embed });

            currentPlayer.reset();
            targetPlayer.reset();

            return;
        }

        currentPlayer.miss = 0;

        const attack = attacks[input];

        if (Math.random() > attack.attackChance) {
            const embed = new Discord.RichEmbed()
            .setDescription('Você falhou durante o ataque!')
            .setThumbnail('https://i.imgur.com/buJdoWo.png')
            .setColor(config.color);
            message.channel.send({ embed });
        } else {
            // variation = max - min
            // rand * variation + min
            const damage = Math.round(Math.random() * (attack.damage.max - attack.damage.min) + attack.damage.min);

            targetPlayer.hp -= damage;
            const embed = new Discord.RichEmbed()
            .setDescription(`**${targetPlayer.user.username}** ${randomItem(attack.messages)} **${currentPlayer.user.username}**`)
            .addField(`HP de **${targetPlayer.user.username}**`, `${targetPlayer.hp} (-${damage} HP)`, true)
            .setThumbnail('https://i.imgur.com/CitIGQy.png')
            .setColor(config.color);
            msg.channel.send({ embed });

            if (targetPlayer.hp <= 0) {
                const embed = new Discord.RichEmbed()
                .setDescription(`**${currentPlayer.user.username}** foi derrotado por **${targetPlayer.user.username}**!`)
                .addField('**Vencedor**', currentPlayer.user.username, true)
                .addField('**Perdedor**', targetPlayer.user.username, true)
                .setThumbnail('https://i.imgur.com/Je4z4D1.png')
                .setColor(config.color);
                msg.channel.send({ embed });
                targetPlayer.reset();
                currentPlayer.reset();
                return;
            }
        }

        fight(message, player1, player2, !turn);
    }).catch(() => {
        const embed = new Discord.RichEmbed()
        .setDescription(`**${currentPlayer.user.username}** não atacou, pulando o turno...`)
        .addField('**Ganhou a vez**', targetPlayer.user.username, true)
        .addField('**Ausente (?)**', currentPlayer.user.username, true)
        .setThumbnail('https://i.imgur.com/zA854nF.png')
        .setColor(config.color);
        message.channel.send({ embed });
        currentPlayer.miss++;

        if (currentPlayer.miss >= 2) {
            message.channel.send(':x: Parece que ninguém responde, terminando jogo.');
            const embed = new Discord.RichEmbed()
            .setDescription(`**${currentPlayer.user.username}** foi derrotado por **${targetPlayer.user.username}**!`)
            .addField('**Vencedor**', targetPlayer.user.username, true)
            .addField('**Perdedor**', currentPlayer.user.username, true)
            .setThumbnail('https://i.imgur.com/3QzRsxB.png')
            .setColor(config.color);
            message.channel.send({ embed });
            currentPlayer.reset();
            targetPlayer.reset();

            return;
        }

        fight(message, player1, player2, !turn);
    });
};

exports.help = {
    name: 'fight',
    usage: 'fight info/<@user>',
    description: 'Inicia uma luta com outro usuário para ver quem ganha.',
    aliases: ['lutar, luta'],
    category: ["Jogos"]
};