const User = require("../../model/user");
const validate = require("validator");
const bcrypt = require("bcrypt");
const checkAuth = require("../../util/check-auth");
const jwt = require("jsonwebtoken");
module.exports = {
  Query: {
    getUsers: async (_, { name }) => {
      console.log(name);
      try {
        const users = await User.find({
          $or: [
            {
              name: {
                $regex: name,
                $options: "i",
              },
            },
            {
              username: {
                $regex: name,
                $options: "i",
              },
            },
          ],
        }).limit(20);
        console.log(users);
        return users;
      } catch (err) {
        console.log(err);
      }
    },
    getUser: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        return user;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      if (!validate.isEmail(email.trim()) || password.trim() === "") {
        throw new Error("Please enter all fields");
      }
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid email id");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Invalid password.");
      }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
        },
        process.env.JWTSECRET,
        {
          expiresIn: "10d",
        }
      );
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    sendFriendRequest: async (_, { username }, context) => {
      const user = checkAuth(context);

      const suser = await User.findOne({ username });
      if (!suser) {
        throw new Error("User not found");
      }
      if (suser) {
        suser.comment.unshift({
          username: user.username,
        });
      }
      await suser.save();
      return suser;
    },

    acceptFriendRequest: async (_, { username }, context) => {
      const user = checkAuth(context);
      const suser = await User.findOne({ username });
      if (!suser) {
        throw new Error("User not found");
      }
      if (
        suser.pendingFriendRequest.find(
          (pending) => pending.username === username
        )
      ) {
        suser.friendList.unshift({
          username: user.username,
        });
        suser.pendingFriendRequest = suser.pendingFriendRequest.filter(
          (pending) => pending.username !== username
        );
      }
      await suser.save();
      return suser;
    },

    rejectFriendRequest: async (_, { username }, context) => {
      const user = checkAuth(context);
      const suser = await User.findOne({ username });
      if (!suser) {
        throw new Error("User not found");
      }
      if (
        suser.pendingFriendRequest.find(
          (pending) => pending.username === username
        )
      ) {
        suser.pendingFriendRequest = suser.pendingFriendRequest.filter(
          (pending) => pending.username !== username
        );
      }
      await suser.save();
      return suser;
    },
    blockUser: async (_, { username }, context) => {
      const user = checkAuth(context);
      const suser = await User.findOne({ username });
      if (!suser) {
        throw new Error("User not found");
      }
      if (suser) {
        suser.blockedUser.unshift({
          username: user.username,
        });
      }
      await suser.save();
      return suser;
    },

    register: async (_, { name, dOB, username, email, password }) => {
      if (
        name.trim() === "" ||
        dOB.trim() === "" ||
        username.trim() === "" ||
        !validate.isEmail(email.trim()) ||
        password.trim() === ""
      ) {
        throw new Error("Please enter all fields correctly");
      }
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email already exists");
      }

      const newUser = new User({
        username,
        name,
        dOB,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      newUser.password = await bcrypt.hash(password, 8);
      const result = await newUser.save();
      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
          name: result.name,
          username: result.username,
        },
        process.env.JWTSECRET,
        {
          expiresIn: "10d",
        }
      );
      return {
        id: result.id,
        ...result._doc,
        token,
      };
    },
  },
};
