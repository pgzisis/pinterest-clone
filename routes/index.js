const User = require("../models/users");

module.exports = app => {
  app.get("/", (req, res) => {
    User.find((err, users) => {
      if (err) throw err;

      if (users && req.user) {
        res.render("index", { user: req.user, users: users });
      } else if (users && !req.user) {
        res.render("index", { user: false, users: users });
      } else {
        res.render("index", { user: false, users: false });
      }
    });
  });
};
