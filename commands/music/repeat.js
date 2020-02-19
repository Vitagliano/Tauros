const lista = require('../../assets/js/queue.js')
const Discord = require("discord.js");
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = async (client, message, args, settings) => {

    console.log(`Command repeat ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

    try {

        var serverQueue = lista.queue.get(message.guild.id)
        var deleteCount = parseInt(args[0])

        if (serverQueue) {
            if (serverQueue.music) {
                if (serverQueue.repeat == 0) {
                    if (args[0]) {
                        if (!deleteCount || deleteCount < 1 || deleteCount > 5) {

                            message.channel.send({
                                embed: {
                                    color: 0xB1A0A8,
                                    description: `<:nao:670446668092801064> - user apenas números de  **\`1\`** a **\`5\`**`,
                                    footer: {
                                        "text": message.author.username,
                                        'icon_url': message.author.displayAvatarURL
                                    },
                                    timestamp: new Date(),
                                }
                            })

                        } else {
                            serverQueue.repeat = args[0]

                            message.channel.send({
                                embed: {
                                    color: 0xB1A0A8,
                                    description: `<:sim:670446566557089843> - repetição **ativa**, repetindo: **${args[0]}**`,
                                    footer: {
                                        "text": message.author.username,
                                        'icon_url': message.author.displayAvatarURL
                                    },
                                    timestamp: new Date(),
                                }
                            })
                        }

                    } else {

                        message.channel.send({
                            embed: {
                                color: 0xB1A0A8,
                                description: `<:sim:670446566557089843> - insira um valor númerico de  **\`1\`** a **\`5\`** para definir a **\`repetição\`**`,
                                footer: {
                                    "text": message.author.username,
                                    'icon_url': message.author.displayAvatarURL
                                },
                                timestamp: new Date(),
                            }
                        })
                    }
                } else {
                    if (args[0] == 'off') {

                        serverQueue.repeat = 0

                        message.channel.send({
                            embed: {
                                color: 0xB1A0A8,
                                description: `<:sim:670446566557089843> - repetição **desativada**, ative usando: **${settings.prefix}repeat [número]**`,
                                footer: {
                                    "text": message.author.username,
                                    'icon_url': message.author.displayAvatarURL
                                },
                                timestamp: new Date(),
                            }
                        })
                    } else if (serverQueue.repeat >= 1) {

                        message.channel.send({
                            embed: {
                                color: 0xB1A0A8,
                                description: `<:nao:670446668092801064> - repetição já esta **ativada**, use: **${settings.prefix}repeat off** `,
                                footer: {
                                    "text": message.author.username,
                                    'icon_url': message.author.displayAvatarURL
                                },
                                timestamp: new Date(),
                            }
                        })
                    }
                }
            } else if (serverQueue.radio) {
                message.channel.send({
                    embed: {
                        description: `<:nao:670446668092801064> - ${message.author}, a **radio** esta ativa, não é possível usar a função repeat!`,
                        color: 0xB1A0A8,
                    }
                }).then(msg => {
                    msg.delete(5000)
                })
            }
        } else {
            message.channel.send({
                embed: {
                    description: `<:nao:670446668092801064> - ${message.author}, não há nada tocando.`,
                    color: 0xB1A0A8,

                }
            }).then(msg => {
                msg.delete(5000)
            });
        }
    } catch (e) {

        console.log(`Erro command REPEAT - guild: ID:(${message.guild.id}) - Name:(${message.guild.name}) Erro: ${e}`)
    }
}