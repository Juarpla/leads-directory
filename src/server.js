const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const database = require("./database");
const bodyParser = require("body-parser");
const responseConfig = require("./utils/responseConfig");
const process = require("process");
const util = require("./utils");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const GitHubStrategy = require("passport-github2").Strategy;
const favicon = require("serve-favicon");
const authController = require("./controllers/authController");

database.initDb((err, _db) =>
  err ? console.error(err) : console.log("Connected to MongoDB"),
);

app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(responseConfig.setHeaders);
app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors({ origin: "*" }));
app.use(favicon("public/favicon.ico"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findOrCreate({ githubId: profile.id }, function name(err, user) {
      return done(null, profile);
      //});
    },
  ),
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use("/", swaggerRoutes);
app.get("/login", passport.authenticate("github"), authController.login);
app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `/api-docs`,
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  },
);
app.use("/", util.handleErrors(routes));

app.use(util.handleRoteError);
app.use(util.expressErrorHandler);
process.on("uncaughtException", util.handleUncaughtException);
process.on("unhandledRejection", util.handleUnhandledRejection);

const port = process.env.PORT || 8080;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}`);
});
