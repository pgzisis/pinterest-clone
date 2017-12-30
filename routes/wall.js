module.exports = app => {
  app.get("/wall/:id", (req, res) => {
    if (req.user) {
      return res.render("wall", { user: req.user });
    }
    res.render("wall", { user: false });
  });
};
