const express = require("express");
const router = express.Router();

const db = require("./models");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  // Find the user whose email matches req.body.email
  db.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.render("login", { error: "Invalid email or password, please try again." });
      }

      if (user.password !== req.body.password) {
        return res.render("login", { error: "Invalid email or password, please try again." });
      }

      req.session.userId = user.id;
      res.redirect("/"); // that does not matter, only for 8080/....//
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;