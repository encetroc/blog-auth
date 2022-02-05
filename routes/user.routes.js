const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { isLoggedIn } = require("../middlewares/guard");

const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("user/signin");
});

router.post("/signin", async (req, res) => {
  const user = new User();
  user.email = req.body.email;
  try {
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    res.redirect("/user/login");
  } catch (error) {
    res.redirect("/user/signin");
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const isPwCorrect = await bcrypt.compare(req.body.password, user.password);
    if (isPwCorrect) {
      req.session.currentUser = user;
      res.redirect("/user/profile");
    } else {
      res.redirect("/user/login");
    }
  } catch (error) {
    res.redirect("/user/login");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/user/login");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("user/profile");
});

module.exports = router;
