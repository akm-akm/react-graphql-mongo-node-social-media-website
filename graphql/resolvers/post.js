const Post = require("../../model/post");
const checkAuth = require("../../util/check-auth");
module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        console.log(err);
      }
    },

    getPost: async (_, { postID }) => {
     
        const post = await Post.findById(postID);
        if (post) {
          return post;
        } else {
          throw new Error("Invalid postID/ Post not found");
        }
     
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      try {
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
      } catch (error) {
        return error;
      }
    },
    deletePost: async (_, { postID }, context) => {
      try {
        checkAuth(context);
        await Post.findByIdAndDelete(postID);
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
