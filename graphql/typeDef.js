const { gql } = require("apollo-server");

module.exports = gql`
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Username {
    username: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type Post {
    id: ID!
    username: String
    body: String!
    createdAt: String!
    comment: [Comment!]!
    commentCount: Int!
    like: [Like!]
    likeCount: Int!
  }
  type UserSearch {
    id: ID!
    username: String!
    name: String!
    email: String!
    friendList: [Username]
    dOB: String
    createdAt: String!
  }
  type User {
    id: ID!
    username: String!
    name: String!
    email: String!
    friendList: [Username]
    dOB: String
    createdAt: String!
    token: String!
  }
  type Profile {
    id: ID!
    username: String!
    name: String!
    email: String!
    friendList: [Username]
    pendingFriendRequest: [Username]
    pendingSentFriendRequest: [Username]
    blockedUser: [Username]
    accountPrivacy: Boolean
    dOB: String
    createdAt: String!
  }
  type RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postID: ID!): Post
    getProfile: Profile
    getUsers(name: String!): [UserSearch]!
    getUser(username: String!): UserSearch!
  }
  type Mutation {
    register(
      name: String!
      dOB: String!
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
    sendFriendRequest(username: String!): Profile!
    rejectFriendRequest(username: String!): Profile!
    revertFriendRequest(username: String!): Profile!
    acceptFriendRequest(username: String!): Profile!
    blockUser(username: String!): Profile!
  }
`;
