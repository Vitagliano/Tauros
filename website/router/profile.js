const express = require("express");
const router = express.Router();
const CheckAuth = require("../auth/CheckAuth");
const profileDB = require("../../models/profile")

router.get("/", CheckAuth, async (req, res) => {
  const userInfo = await profileDB.findOne({ userID: req.user.id });
  res.render("profile.ejs", {
    status: req.isAuthenticated()
      ? `${req.user.username}#${req.user.discriminator}`
      : "Login",
    client: req.bot.user,
    user: req.user,
    userInfo,
    login: req.isAuthenticated() ? "yes" : "no",
    guilds: req.user.guilds.filter(
      u => (u.permissions & 2146958591) === 2146958591
    ),
    avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
    iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`
  });
});

module.exports = router;
