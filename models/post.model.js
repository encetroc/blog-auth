const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // this is a reference to the user model
  author: {
    // type object id
    type: mongoose.SchemaTypes.ObjectId,
    // reference to user model
    ref: "User",
    required: true,
  },
  comments: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: [],
    ref: "Comment",
  },
  private: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Post", postSchema);
