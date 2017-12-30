module.exports = app => {
  app.get("/", (req, res) => {
    if (req.user) {
      return res.render("index", { user: req.user });
    }
    res.render("index", { user: false });
  });
};
