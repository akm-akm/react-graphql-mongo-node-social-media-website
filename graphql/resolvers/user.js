const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect");
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWTSECRET,
        {
          expiresIn: "10d",
        }
      );
      //   user.token = user.tokens.concat({ token });
      //     const newuser
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },

    register: async (_, { username, email, password }) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      newUser.password = await bcrypt.hash(password, 8);
      const result = await newUser.save();
      const token = jwt.sign(
        { id: result.id, email: result.email, username: result.username },
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
