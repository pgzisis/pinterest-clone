const User = require("../models/users");

module.exports = app => {
  app.get("/wall/:id", (req, res) => {
    const { id } = req.params;

    // user is logged in and it's his wall
    if (req.user) {
      if (req.user.twitterId === id) {
        return res.render("wall", {
          user: req.user,
          otherWall: false
        });
        res.redirect("/");
      }

      // user is logged in and it's another user's wall
      User.findOne(
        {
          twitterId: id
        },
        (err, user) => {
          if (err) throw err;
          if (user) {
            return res.render("wall", {
              user: req.user,
              otherWall: user
            });
          }
          res.redirect("/");
        }
      );
    }

    // visitor at another user's wall
    User.findOne(
      {
        twitterId: id
      },
      (err, user) => {
        if (err) throw err;
        if (user) {
          return res.render("wall", {
            user: false,
            otherWall: user
          });
        }
        res.redirect("/");
      }
    );
  });

  // adding a new picture
  app.post("/wall/:id", (req, res) => {
    const id = req.params.id;
    const picture = req.body;

    User.findOne({ twitterId: id }, (err, user) => {
      if (err) throw err;

      const pictureExists = (picture, pictures) => {
        for (let i = 0; i < pictures.length; i++) {
          if (
            pictures[i]["_doc"].title === picture.title ||
            pictures[i]["_doc"].url === picture.url
          ) {
            return true;
          }
        }
        return false;
      };

      if (pictureExists(picture, user.pictures)) {
        return res.json({
          success: false,
          description: "Picture already exists."
        });
      }
      user.pictures.push(picture);
      user.save();
      res.json({
        success: true
      });
    });
  });

  // delete a picture
  app.delete("/wall/:id", (req, res) => {
    const twitterid = req.params.id;
    const pictureid = req.body.id;

    User.findOne({ twitterId: twitterid }, (err, user) => {
      if (err) throw err;
      if (user) {
        user.pictures.pull({ _id: pictureid });
        user.save();
        res.json({
          success: true
        });
      }
    });
  });
};
