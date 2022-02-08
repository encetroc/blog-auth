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
  post.private = req.body.private;
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
  res.render("post/viewAll", { posts });
});

// show private post
router.get("/viewPrivate", isLoggedIn, async (req, res) => {
  const posts = await Post.find({ author: req.session.currentUser._id, private: true });
  res.render("post/viewAll", { posts });
});

// shows public posts
router.get("/viewPublic", isLoggedIn, async (req, res) => {
  const posts = await Post.find({ private: false });
  res.render("post/viewAll", { posts });
});

// show one post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("comments")
    .populate("author")
    .populate({
      path: "comments",
      populate: "author",
    });
  console.log(post);
  res.render("post/viewOne", { post });
});

module.exports = router;
