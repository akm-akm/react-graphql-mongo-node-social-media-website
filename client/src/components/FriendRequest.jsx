import React from "react";
import gql from "graphql-tag";
export default function FriendRequest() {
  return <div>F</div>;
}

const BLOCK_USER = gql`
  mutation BlockUser($username: String!) {
    blockUser(username: $username) {
      id
      blockedUser {
        username
      }
    }
  }
`;

const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($username: String!) {
    sendFriendRequest(username: $username) {
      id
    
      pendingSentFriendRequest {
        username
      }
    
    }
  }
`;

const REJECT_FRIEND_REQUEST = gql`
  mutation RejectFriendRequest($username: String!) {
    rejectFriendRequest(username: $username) {
      id
    
      pendingFriendRequest {
        username
      }
     
    }
  }
`;
const REVERT_FRIEND_REQUEST = gql`
  mutation RevertFriendRequest($username: String!) {
    revertFriendRequest(username: $username) {
      id
      friendList {
        username
      }
      pendingFriendRequest {
        username
      }
      pendingSentFriendRequest {
        username
      }
    }
  }
`;

const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($username: String!) {
    acceptFriendRequest(username: $username) {
      id
      
      friendList {
        username
      }
      pendingFriendRequest {
        username
      }
    
    }
  }
`;
