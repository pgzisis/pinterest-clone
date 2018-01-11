const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/users");
const mongoose = require("mongoose");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackURL:
          "https://hidden-plains-14482.herokuapp.com/auth/twitter/callback"
      },
      (token, tokenSecret, profile, done) => {
        process.nextTick(() => {
          User.findOne({ twitterId: profile.id }, (err, user) => {
            if (err) return done(err);
            if (user) {
              return done(null, user);
            }

            const newUser = new User();
            newUser.twitterId = profile.id;
            newUser.token = token;
            newUser.name = profile.displayName;
            newUser.photo = profile.photos[0].value;

            newUser.save(err => {
              if (err) throw err;
              return done(null, newUser);
            });
          });
        });
      }
    )
  );
};
