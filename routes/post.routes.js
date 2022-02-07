const express = require("express");
const { isLoggedIn } = require("../middlewares/guard");
const Post = require("../models/post.model");

const router = express.Router();

// shows post creation form
router.get("/create", isLoggedIn, (req, res) => {
  res.render("post/create");
});

// handles the creation of a post
router.post("/create", isLoggedIn, async (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.description = req.body.description;
  post.author = req.session.currentUser._id;
  try {
    await post.save();
    res.redirect("/");
  } catch (error) {
    res.redirect("/post/create");
  }
});

// shows all posts
router.get("/viewAll", isLoggedIn, async (req, res) => {
  const posts = await Post.find({ author: req.session.currentUser._id });
  res.render('post/viewAll', {posts})
});

module.exports = router;
