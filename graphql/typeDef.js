const { gql } = require("apollo-server");

module.exports = gql`
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Username{
    username: String!
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
    name: String!
    email: String!
    friendList: [Username]
    age: String!
    dOB: String
    createdAt: String!
    password: String!
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
    getUser(username: String!): User!
  }
  type Mutation {
    register(
      name: String!
      age: String!
      username: String!
      email: String!
      password: String!
    ): User!
    login(email: String!, password: String!): User!
    logout(token: String!): Boolean!
    createPost(body: String!): Post!
    deletePost(postid: ID!): Post!
    createComment(postID: ID!, body: String!): Post
    deleteComment(commentID: ID!, postID: ID!): Post!
    createLike(postID: ID!): Post!
    subscrption: Boolean!
    sendFriendRequest(username: String!): User!
    rejectFriendRequest(username: String!): User!
    acceptFriendRequest(username: String!): User!
    blockUser(username: String!): User!
  }
`;
