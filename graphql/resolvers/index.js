const user = require("./user");
const post = require("./post");
const comment = require("./comment");
module.exports = {
  Post: {
    likeCount: (parent) => parent.like.length,
    commentCount: (parent) => parent.comment.length,
  },
  
  Query: {
    ...user.Query,
    ...post.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...post.Mutation,
    ...comment.Mutation,
  },
};
