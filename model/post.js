const mongoose = require("mongoose");
const postSchmea = new mongoose.Schema({
  username: String,
  body: String,
  comment: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  createdAt: String,
  like: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchmea);

module.exports = Post;