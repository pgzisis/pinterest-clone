const passport = require("passport");

module.exports = app => {
  app.get("/auth/twitter", passport.authenticate("twitter"));
};
