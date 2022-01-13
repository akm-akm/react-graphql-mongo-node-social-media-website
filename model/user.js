const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        lowercase: true
  },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
        
  },
  password: String,
  about: String,
  dOB: String,
  age: Number,
  createdAt: String,
  token: [
    {
      token: String,
    },
  ],
  friendList: [
    {
      createdAt: Date.now(),
      username: String,
    },
  ],
  pendingFriendRequest: [
    {
      createdAt: Date.now(),
      username: String,
    },
  ],
  blockedUser: [
    {
      username: String,
    },
  ],
  profilePicture: Buffer,
  coverPicture: Buffer,
});

const User = mongoose.model("User", userSchema);

module.exports = User;