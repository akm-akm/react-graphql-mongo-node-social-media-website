import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BlockIcon from "@mui/icons-material/Block";
import PendingIcon from "@mui/icons-material/Pending";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { ButtonGroup } from "@mui/material";

export default function FriendRequest({ username, profile }) {
  const profilee = profile.getProfile;
  if (profilee.friendList.find((x) => x.username === username)) {
    return (
      <Button
        mt={100}
        /*  
       onClick={uploadNewPost}
       */
        type="submit"
        variant="contained"
        startIcon={<PersonRemoveIcon />}
      >
        remove friend
      </Button>
    );
  }
  if (profilee.pendingFriendRequest.find((x) => x.username === username)) {
    return (
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          mt={100}
          /*  
         onClick={uploadNewPost}
         */
          type="submit"
          variant="contained"
          startIcon={<PersonAddIcon />}
        >
          accept request
        </Button>
        <Button
          mt={100}
          /*  
         onClick={uploadNewPost}
         */
          type="submit"
          variant="contained"
          startIcon={<CancelIcon />}
        >
          reject request
        </Button>
      </ButtonGroup>
    );
  }
  if (profilee.pendingSentFriendRequest.find((x) => x.username === username)) {
    return (
      <Button
        mt={100}
        /*
          onClick={uploadNewPost}
          */
        type="submit"
        variant="contained"
        startIcon={<PendingIcon />}
      >
        pending
      </Button>
    );
  } else if (profilee.blockedUser.find((x) => x.username === username)) {
    return (
      <Button
        mt={100}
        /*
          onClick={uploadNewPost}
          */
        type="submit"
        variant="contained"
        startIcon={<BlockIcon />}
      >
        unblock
      </Button>
    );
  } else
    return (
      <Button
        mt={100}
        /*  
       onClick={uploadNewPost}
       */
        type="submit"
        variant="contained"
        startIcon={<PersonAddIcon />}
      >
        add friend
      </Button>
    );
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
