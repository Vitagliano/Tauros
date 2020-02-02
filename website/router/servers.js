const express = require("express");
const router = express.Router();
const CheckAuth = require("../auth/CheckAuth");
const guildDB = require("../../models/guild");

router
  .get("/:guildID", CheckAuth, async (req, res) => {
    let serv = req.bot.guilds.get(req.params.guildID);
    if (!serv) {
      return res.redirect(
        `https://discordapp.com/oauth2/authorize?client_id=${req.bot.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`
      );
    }
    
    if (!req.bot.guilds
      .get(req.params.guildID)
      .members.get(req.user.id)
      .hasPermission("MANAGE_GUILD")
    ) return res.redirect("/dashboard");

    const guildInfo = await guildDB.findOne({ guildID: req.params.guildID });

    res.render("guild.ejs", {
      status: req.isAuthenticated()
        ? `${req.user.username}#${req.user.discriminator}`
        : "Login",
      client: req.bot.user,
      user: req.user,
      login: req.isAuthenticated() ? "yes" : "no",
      guildInfo,
      avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
      iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
      guild: serv
    });
  })
  .post("/:guildID", CheckAuth, async function(req, res) {
    /* Esse req.body é o conteúdo do POST. */
    /* Você passou o conteúdo do POST através do `data` do AJAX no fronted. */
    const data = req.body;

    // reinicia
    guildDB
      .findOneAndUpdate({ guildID: req.params.guildID }, { $set: data })
      .then(() => {
        // atualizado
        res.send({ status: "ok" });
      })
      .catch(err => {
        throw err;
      });
  });

module.exports = router;
