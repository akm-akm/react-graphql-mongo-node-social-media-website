const User = require("../../model/user");
const validate = require("validator");
const bcrypt = require("bcrypt");
const checkAuth = require("../../util/check-auth");
const jwt = require("jsonwebtoken");
module.exports = {
  Query: {
    getUsers: async (_, { name }, context) => {
      console.log(name);
      const { username } = checkAuth(context);
      try {
        let users = await User.find({
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
        users = users.filter((x) => x.username !== username);
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
    getProfile: async (_, __, context) => {
      const { username } = checkAuth(context);
      try {
        const profile = await User.findOne({ username });
        return profile;
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
      const { username: myusername } = checkAuth(context);

      const suser = await User.findOne({ username });
      const profile = await User.findOne({ myusername });
      if (!suser) {
        throw new Error("User not found");
      }
      if (suser) {
        suser.pendingFriendRequest.unshift({
          username: myusername,
        });
        profile.pendingSentFriendRequest.unshift({
          username,
        });
      }
      await suser.save();
      await profile.save();
      return profile;
    },

    acceptFriendRequest: async (_, { username }, context) => {
      const { username: myusername } = checkAuth(context);
      const suser = await User.findOne({ username });
      const profile = await User.findOne({ myusername });

      if (!suser) {
        throw new Error("User not found");
      }
      if (
        profile.pendingFriendRequest.find(
          (pending) => pending.username === username
        )
      ) {
        suser.friendList.unshift({
          username: myusername,
        });
        suser.pendingSentFriendRequest = suser.pendingSentFriendRequest.filter(
          (pending) => pending.username !== myusername
        );
        profile.friendList.unshift({
          username,
        });
        profile.pendingFriendRequest = profile.pendingFriendRequest.filter(
          (pending) => pending.username !== username
        );
      }
      await suser.save();
      await profile.save();
      return profile;
    },

    rejectFriendRequest: async (_, { username }, context) => {
      const { username: myusername } = checkAuth(context);
      const suser = await User.findOne({ username });
      const profile = await User.findOne({ myusername });
      if (!suser) {
        throw new Error("User not found");
      }
      if (
        profile.pendingFriendRequest.find(
          (pending) => pending.username === username
        )
      ) {
        profile.pendingFriendRequest = profile.pendingFriendRequest.filter(
          (pending) => pending.username !== username
        );
        suser.pendingSentFriendRequest = suser.pendingSentFriendRequest.filter(
          (pending) => pending.username !== myusername
        );
      }
      await suser.save();
      await profile.save();
      return profile;
    },
    revertFriendRequest: async (_, { username }, context) => {
      const { username: myusername } = checkAuth(context);
      const suser = await User.findOne({ username });
      const profile = await User.findOne({ myusername });
      if (!suser) {
        throw new Error("User not found");
      }
      if (true) {
        profile.pendingFriendRequest = profile.pendingFriendRequest.filter(
          (pending) => pending.username !== username
        );
        profile.pendingSentFriendRequest =
          profile.pendingSentFriendRequest.filter(
            (pending) => pending.username !== username
          );
        profile.friendList = profile.friendList.filter(
          (pending) => pending.username !== username
        );

        suser.pendingFriendRequest = suser.pendingFriendRequest.filter(
          (pending) => pending.username !== myusername
        );
        suser.pendingSentFriendRequest = suser.pendingSentFriendRequest.filter(
          (pending) => pending.username !== myusername
        );
        suser.friendList = suser.friendList.filter(
          (pending) => pending.username !== myusername
        );
      }
      await suser.save();
      await profile.save();
      return profile;
    },
    blockUser: async (_, { username }, context) => {
      const { username: myusername } = checkAuth(context);
      const suser = await User.findOne({ username });
      const profile = await User.findOne({ myusername });
      if (!suser) {
        throw new Error("User not found");
      }
      if (suser) {
        profile.blockedUser.unshift({
          username,
        });
      }
      await profile.save();
      return profile;
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
        process.env.JWTSECRET
      );
      result.token.unshift({
        token,
      });
      await result.save();
      return {
        id: result.id,
        ...result._doc,
        token,
      };
    },
  },
};
