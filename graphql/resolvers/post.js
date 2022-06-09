const Post = require("../../model/post");
const checkAuth = require("../../util/check-auth");
module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts.reverse();
      } catch (err) {
        console.log(err);
      }
    },

    getPost: async (_, { postID }) => {
      const post = await Post.findById(postID);
      if (post) {
        return post;
      } else {
        throw new Error("Invalid postID / Post not found");
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new Error("Can not post empty body");
      }
      console.log("fuk", user);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return {
        ...user._doc,
        id: post.id,
        ...post._doc,
      };
    },
    deletePost: async (_, { postID }, context) => {
      checkAuth(context);
      try {
        await Post.findByIdAndDelete(postID);
        return true;
      } catch (err) {
        throw new Error("Invalid postID / Post not found");
      }
    },
  },
};
