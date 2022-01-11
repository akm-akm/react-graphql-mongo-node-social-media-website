const User = require("../../model/user");
const validate = require('validator')
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

      if (!validate.isEmail(email.trim()) || password.trim() === "") {
        throw new Error("Please enter all fields");
      }
      const user = await User.findOne({ email });
     
     
      if (!user) {
        throw new Error("Invalid email id.");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Invalid password.");
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

    register: async (_, { name, age, username, email, password }) => {
      if (
        name.trim() === "" ||
        age.trim() === "" ||
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
        age,
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
