const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

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
    res.redirect("/");
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
      res.redirect("/");
    } else {
      res.redirect("/user/login");
    }
  } catch (error) {
    res.redirect("/user/login");
  }
});

module.exports = router;
