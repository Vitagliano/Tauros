const Discord = require("discord.js");
const util = require("util");

exports.run = async (client, msg, args) => {

    if(msg.author.id != process.env.OWNER) return msg.channel.send("❌ Você não tem permissão para usar esse comando.");
        let code = args.join(" ")
        if (!code) return msg.channel.send("Especifique o code que você deseja executar.")
        try {
        let resultado = await eval(code)
        if (typeof resultado !== 'string') {resultado = require('util').inspect(resultado);}
        msg.channel.send(`**📥 Code:**\n \`\`\`js\n${resultado}\`\`\``)
        } catch (err) {
            msg.channel.send(`**📤 Erro:**\n \`\`\`js\n${err}\`\`\``)
        }
}

exports.help = {
    name : "eval",
    type: "Owner",
}
