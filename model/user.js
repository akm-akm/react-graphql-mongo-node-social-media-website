const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  accountPrivacy: {
    type: String,
    required: true,
    default: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  dOB: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: String,
    trim: true,
    default: Date.now(),
  },
  token: [
    {
      token: {
        type: String,
        trim: true,
      },
    },
  ],
  friendList: [
    {
      createdAt: {
        type: String,
        trim: true,
        default: Date.now(),
      },
      username: {
        type: String,
      },
    },
  ],
  pendingFriendRequest: [
    {
      createdAt: {
        type: String,
        trim: true,
        default: Date.now(),
      },
      username: {
        type: String,
      },
    },
  ],
  blockedUser: [
    {
      username: {
        type: String,
      },
    },
  ],
  profilePicture: {
    type: Buffer,
  },
  coverPicture: {
    type: Buffer,
  },
});


userSchema.virtual("Post", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
