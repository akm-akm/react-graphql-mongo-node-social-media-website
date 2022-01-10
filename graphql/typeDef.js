const { gql } = require("apollo-server");

module.exports = gql`
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    comment: [Comment!]!
    commentCount: Int!
    like: [Like!]
    likeCount: Int!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: String!
    token: String!
  }
  type RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postID: ID!): Post
    getUsers: [User]!
  }
  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    logout(token: String!): Boolean!
    createPost(body: String!): Post!
    deletePost(postid: ID!): Boolean!
    createComment(postID: ID!, body: String!): Post
    deleteComment(commentID: ID!, postID: ID!): Post!
    createLike(postID: ID!): Post!
    subscrption: Boolean!
  }
`;
