const Post = require("../../model/post");
const validate = require("validator");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    createComment: async (_, { postID, body }, context) => {
      const { username } = checkAuth(context);
      try {
        if (body.trim() === "") {
          throw new Error("Cannot be empty");
        }
        const post = await Post.findById(postID);
        if (post) {
          post.comment.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
        } else {
          throw new Error("Invalid postID");
        }
        return post;
      } catch (error) {
        throw new Error();
      }
    },

    deleteComment: async (_, { postID, commentID }, context) => {
      try {
        const { username } = checkAuth(context);
        const post = await Post.findById(postID);
        if (post) {
          post.comment = post.comment.filter((comment) => {
            return comment.id !== commentID;
          });
        }
        await post.save();
        return post;
      } catch (error) {
        console.log(error);
        throw new Error("Invalid postID");
      }
    },
    createLike: async (_, { postID }, context) => {
      const { username } = checkAuth(context);
      try {
        const post = await Post.findById(postID);
        if (post.like.find((like) => like.username === username)) {
          post.like = post.like.filter((like) => like.username !== username);
        } else {
          post.like.unshift({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } catch (error) {
        throw new Error("Invalid postID");
      }
    },
    
  },
};
