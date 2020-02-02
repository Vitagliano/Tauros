const discord = require('discord.js');
const config = require("../../config.json");

let channels = [];

const quiz = [
    {q: "Quantas Copas de futebol o Brasil ganhou? \n\nA) 4 \nB) 2 \nC) 5 \nD) Nenhuma", a: "c"},
    {q: "Qual é o nome do bot? \n\nA) Loritta\nB) Tauros\nC) Geralt\nD) Dyno", a: "b"},
    {q: "Qual linguagem o bot foi criada? \n\nA) Java\nB) Go\nC) Javascript\nD) Python", a: "c"},
];

const options = {
    max: 1,
    time: 30000,
    errors: ["time"],
};

exports.run = async (bot, message, args) => {

    if (args[0] === 'ajuda') {
        const embed = new Discord.RichEmbed()
            .setTitle(`${nameCapitalized}`)
            .setDescription(client.commands.get("quiz").help.description)
            .addField('Como usar:', `${config.BOT_PREFIX}${client.commands.get("quiz").help.usage}`)
            .setColor(config.color)
        message.channel.send({embed})
        return;
    } 

    if(channels.includes(message.channel.id)) return message.channel.send("já existe um quiz rolando, aguarde o final do mesmo antes que seja iniciado outro.");

    const item = quiz[Math.floor(Math.random() * quiz.length)];
    await message.channel.send(item.q);
    channels.push(message.channel.id);
    try {
        const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
        const winnerMessage = collected.first();
        for (var i = 0; i < channels.length; i++){ 
            if (channels[i] === message.channel.id) {
              channels.splice(i, 1); 
            };
         };
        return message.channel.send({embed: new discord.RichEmbed()
            .setAuthor(`Vencedor: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
            .setTitle(`Resposta correta: \`${winnerMessage.content.toUpperCase()}\``)
            .setDescription(`Pergunta: ${item.q}`)
            .setColor(config.color)
        })
    } catch (e) {
        for (var i = 0; i < channels.length; i++){ 
            if (channels[i] === message.channel.id) {
              channels.splice(i, 1); 
            };
         };
        return message.channel.send({embed: new discord.RichEmbed()
            .setAuthor('Ninguém acertou a tempo!')
            .setTitle(`Resposta correta: \`${item.a}\``)
            .setDescription(`Pergunta: ${item.q}`)
        })
    }
}
exports.help = {
    name: "quiz",
    description: "Um jogo de perguntas e respostas.",
    usage: "quiz",
    category: "Utilidades"
}