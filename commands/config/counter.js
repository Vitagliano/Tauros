const Discord = require("discord.js");
const guildDB = require("../../models/guild");

module.exports.run = (client, message, args) => {

    const mention = message.mentions.channels.first();

    guildDB.findOne({ guildID: message.guild.id }, function(err, doc) {

        let counter;

        if (!doc.counter) counter = `Status: **Desativado**`;
        else counter = `Status: **Ativado**`;

        let counterchannel;

        if (doc.counter.channel === 'geral') {
            counterchannel = `Canal do **contador de membros**:\n ${doc.counter.channel}`;
        } else {
            counterchannel = `Canal do **contador de membros**:\n <#${doc.counter.channel}>`;
        }

        const n0 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '0_redblue');
        const n1 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '1_redblue');
        const n2 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '2_redblue');
        const n3 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '3_redblue');
        const n4 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '4_redblue');
        const n5 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '5_redblue');
        const n6 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '6_redblue');
        const n7 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '7_redblue');
        const n8 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '8_redblue');
        const n9 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '9_redblue');

        let membros =  `${client.guilds.get(message.guild.id).memberCount.toString()}`;
        let counterEmoji = membros.split('').map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i]).join('');
        let countermsg;

        if (doc.counter.message === 'Temos {membros} no servidor') {
            countermsg = `Mensagem do counter:\n **(${doc.counter.message})**`;
        } else {
            countermsg = `Mensagem do counter:\n ${doc.counter.message.replace("{membros}", counterEmoji)}`;
        }

        const info = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`Menu de \`configurações\` de \`contador de membros\` do servidor!
          
          ${counter}
          ${counterchannel}
          ${countermsg}`)
            .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()

        if (!args[0]) return message.channel.send(info);

        switch (args[0]) {

            case 'channel':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!mention)
                     return message.channel.send(info);

                if (mention.id === doc.counter.channel) {
                     return message.channel.send(`\`${message.author.tag}\` o canal \`mencionado\` ja está setado como \`contador de membros\`.`);
                } else {

                    doc.counter.channel = mention.id;
                    doc.save();

                    message.channel.send(`\`${message.author.tag}\` você setou o canal ${mention} como \`contador de membros\`.`);
                    break;
                }

            case 'help':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                    const helpEmbed = new Discord.RichEmbed()
                    .setAuthor(`Ajuda para configuração do counter:`, client.user.avatarURL)
                    .setDescription(`
                    \`${doc.prefix}counter canal <channel-mention>\` - O canal mencionado será setado como counter, ou seja todos os novos membros serão registrados no topico com emoji.
                    \`${doc.prefix}counter remover\` - Remove o canal, mensagem e desativa o counter do servidor.
                    \`${doc.prefix}counter msg <mensagem>\` - A mensagem adicionada será a que será setada no topico. [ Use \`{membros}\` para pegar os membros ]
                    \`${doc.prefix}counter on\` - Ativará o status do counter, ou seja com isto o \`client-D4\` irá setar o topico.
                    \`${doc.prefix}counter off\` - Desativará o status do counter, ou seja com isto o \`client-D4\` não irá mais setar o topico.`)
                    .setColor("RANDOM")

                    message.channel.send(helpEmbed);
                   break;

            case 'msg':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (doc.counter.channel === 'geral') {
                    return message.channel.send(`\`${message.author.tag}\` nenhum \`canal\` foi definido como \`contador de membros\` para você utilizar está função!`);
                } else {

                    doc.counter.message = args.slice(1).join(' ');
                    doc.save();

                    const n0 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '0_redblue');
                    const n1 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '1_redblue');
                    const n2 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '2_redblue');
                    const n3 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '3_redblue');
                    const n4 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '4_redblue');
                    const n5 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '5_redblue');
                    const n6 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '6_redblue');
                    const n7 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '7_redblue');
                    const n8 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '8_redblue');
                    const n9 = client.guilds.get('664669230284800000').emojis.find(o => o.name === '9_redblue');

                    let membros =  `${client.guilds.get(message.guild.id).memberCount.toString()}`;
                    let counterEmoji = membros.split('').map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i]).join('');
                    client.guilds.get(message.guild.id).channels.get(doc.counter.channel).setTopic(args.slice(1).join(' ').replace("{membros}", `${counterEmoji}`));
                    message.channel.send(`\`${message.author.tag}\` você definiu uma mensagem para o \`contador de membros\` com sucesso!`);
                    break;
            }

            case 'on':

                    if (doc.counter.enabled === true) {
                        return message.channel.send(`\`${message.author.tag}\` o status de \`contador de membros\` ja está ativado!`);
                    } else {

                        doc.counter.enabled = true;
                        doc.save().then(async () => {
                            await message.channel.send(`\`${message.author.tag}\` o status do sistema de \`contador de membros\` do servidor foi alterado para \`on\`.`);
                        })
                        break;
                    }
                    case 'off':

                    if (doc.counter.enabled === false) {
                        return message.channel.send(`\`${message.author.tag}\` o status de \`contador de membros\` ja está desativado!`);
                    } else {

                        doc.counter.enabled = false;
                        doc.save().then(async () => {
                            await message.channel.send(`\`${message.author.tag}\` o status do sistema de \`contador de membros\` do servidor foi alterado para \`off\`.`);
                        })
                        break;
                    }

            case 'remover':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!doc.counter) {
                    return message.channel.send(`\`${message.author.tag}\` nenhum canal está setado como \`contador de membros\` para você remover!`);
                } else {

                    client.guilds.get(message.guild.id).channels.get(doc.counter.channel).setTopic('');

                    doc.counter = false;
                    doc.counter.channel = 'Nenhum';
                    doc.counter.message = 'Nenhuma';
                    doc.save();

                    message.channel.send(`\`${message.author.tag}\` você retirou o \`contador de membros\` do servidor!`);
                    break;
                }

                    default:
                    message.channel.send(`\`${message.author.tag}\` configuração \`${args.slice(0).join(' ')}\` desconhecida, tente usar: \`channel, remover, msg, on, off ou help\`.`)
        }
    })
}

exports.help = {
    name: 'counter',
    aliases: ['counter'],
    usage: "counter help",
    description: "Define o contador de membros em um canal",
    category: "Configuração"
}