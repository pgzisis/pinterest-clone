const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );
};
