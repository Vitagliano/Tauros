const express = require("express");
const session = require("express-session");
const app = express();
const passport = require("passport");
const { Strategy } = require("passport-discord");
const bodyparser = require("body-parser");
const path = require("path");

module.exports.load = async(client) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  let scopes = ["identify", "guilds"];

  passport.use(new Strategy({
    clientID: client.user.id,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login',
    scope: scopes
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
  }));
  
  app
  .use(bodyparser.json())
  .use(bodyparser.urlencoded({ extended: true }))
  .engine("html", require("ejs").renderFile)
  .use(express.static(path.join(__dirname, "/public")))
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "views"))
  .set('port', process.env.PORT || 3000)
  .use(session({
    secret: "taurosbot dashboard",
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(function(req,res,next){
    req.bot = client;
    next();
  })
  .use("/", require("./router/index"))
  .use("/profile", require("./router/profile"))
  .use("/servers", require("./router/servers"))  
  .get("*", function(req, res) {
    res.redirect("/");
  });

 app
  .listen(app.get('port'), (err) => {
    if (err) throw err;
    console.log(`Tauros Dashboard está online na porta ${app.get('port')}`);
  });
  
  process.on("unhandledRejection", (r) => {
    console.dir(r);
  });  
};

