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

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
