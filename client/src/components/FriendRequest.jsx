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

const GET_SELF_PROFILE = gql`
  query GetProfile {
    getProfile {
      friendList {
        username
      }
      pendingFriendRequest {
        username
      }
      pendingSentFriendRequest {
        username
      }
      blockedUser {
        username
      }
    }
  }
`;

export default function FriendRequest({ username, profile }) {
  const profilee = profile.getProfile;
  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST, {
    variables: {
      username: username,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_SELF_PROFILE,
      });
      data.getProfile = result.data.acceptFriendRequest;
      proxy.writeQuery({
        query: GET_SELF_PROFILE,
        data,
      });
    },
  });

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    variables: {
      username: username,
    },
    update(proxy, result) {
      console.log(result);
      const data = proxy.readQuery({
        query: GET_SELF_PROFILE,
      });

      data.getProfile = result.data.sendFriendRequest;
      proxy.writeQuery({
        query: GET_SELF_PROFILE,
        data,
      });
    },
  });

  const [rejectFriendRequest] = useMutation(REJECT_FRIEND_REQUEST, {
    variables: {
      username: username,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_SELF_PROFILE,
      });
      data.getProfile = result.data.rejectFriendRequest;
      proxy.writeQuery({
        query: GET_SELF_PROFILE,
        data,
      });
    },
  });
  const [revertFriendRequest] = useMutation(REVERT_FRIEND_REQUEST, {
    variables: {
      username: username,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_SELF_PROFILE,
      });

      data.getProfile = result.data.revertFriendRequest;
      proxy.writeQuery({
        query: GET_SELF_PROFILE,
        data,
      });
    },
  });
  const [blockUser] = useMutation(BLOCK_USER, {
    variables: {
      username: username,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_SELF_PROFILE,
      });
      data.getProfile = result.data.blockUser;
      proxy.writeQuery({
        query: GET_SELF_PROFILE,
        data,
      });
    },
  });

  if (profilee.friendList.find((x) => x.username === username)) {
    return (
      <Button
        mt={100}
        onClick={revertFriendRequest}
        type="submit"
        variant="contained"
        startIcon={<CheckCircleIcon />}
      >
        friends
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
          onClick={acceptFriendRequest}
          type="submit"
          variant="contained"
          startIcon={<PersonAddIcon />}
        >
          accept
        </Button>
        <Button
          mt={100}
          onClick={rejectFriendRequest}
          type="submit"
          variant="contained"
          startIcon={<CancelIcon />}
        >
          reject
        </Button>
      </ButtonGroup>
    );
  }
  if (profilee.pendingSentFriendRequest.find((x) => x.username === username)) {
    return (
      <Button
        mt={100}
        onClick={revertFriendRequest}
        type="submit"
        variant="contained"
        startIcon={<PendingIcon />}
      >
        request sent
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
        onClick={sendFriendRequest}
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
      friendList {
        username
      }
      pendingFriendRequest {
        username
      }
      pendingSentFriendRequest {
        username
      }
      blockedUser {
        username
      }
    }
  }
`;

const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($username: String!) {
    sendFriendRequest(username: $username) {
      friendList {
        username
      }
      pendingFriendRequest {
        username
      }
      pendingSentFriendRequest {
        username
      }
      blockedUser {
        username
      }
    }
  }
`;

const REJECT_FRIEND_REQUEST = gql`
  mutation RejectFriendRequest($username: String!) {
    rejectFriendRequest(username: $username) {
      friendList {
        username
      }
      pendingFriendRequest {
        username
      }
      pendingSentFriendRequest {
        username
      }
      blockedUser {
        username
      }
    }
  }
`;
const REVERT_FRIEND_REQUEST = gql`
  mutation RevertFriendRequest($username: String!) {
    revertFriendRequest(username: $username) {
      friendList {
        username
      }
      pendingFriendRequest {
        username
      }
      pendingSentFriendRequest {
        username
      }
      blockedUser {
        username
      }
    }
  }
`;

const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($username: String!) {
    acceptFriendRequest(username: $username) {
      friendList {
        username
      }
      pendingFriendRequest {
        username
      }
      pendingSentFriendRequest {
        username
      }
      blockedUser {
        username
      }
    }
  }
`;
