import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Post from "./post";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Divider } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import LocationOn from "@mui/icons-material/LocationOn";
import Edit from "@mui/icons-material/Edit";
import { AuthContext } from "../context/AuthContext";
import FriendRequest from "../components/FriendRequest";
const SEARCH_USER = gql`
  query GetUsers($name: String!) {
    getUsers(name: $name) {
      id
      username
      name
      email
      friendList {
        username
      }
      dOB
      createdAt
    }
  }
`;
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

export default function Search() {
  const { user } = React.useContext(AuthContext);
  const [error, seterror] = React.useState(undefined);
  const [value, setValue] = useState({
    name: "",
    data: null,
  });
  const { loadings, errorfetch, data: Profile } = useQuery(GET_SELF_PROFILE);

  const {
    loading,
    data: datas,
    errors,
  } = useQuery(
    SEARCH_USER,
    {
      variables: {
        name: value.name,
      },
    },
    [value.name]
  );

  const handleChange = (event) => {
    setValue({ ...value, name: event.target.value });
  };

  // if (loading || loadings || value.name.length < 1) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm">
      <div>
        <Card
          sx={{
            maxWidth: 700,
            marginBottom: 5,
            marginTop: 5,
            paddingRight: 1,
          }}
        >
          <CardHeader title="Search Users" />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "536px" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Search "
                autoFocus
                name="name"
                value={value.name}
                onChange={handleChange}
              />
            </div>
          </Box>
        </Card>
      </div>
      <div mt={100}>
        {!((loading || loadings) /*|| value.name.length < 1*/)
          ? datas.getUsers.map((result) => (
              <Card
                key={result.id}
                sx={{
                  maxWidth: 700,
                  marginBottom: 5,
                  marginTop: 5,
                  paddingRight: 1,
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {result.username[0]}
                    </Avatar>
                  }
                  title={result.name}
                  subheader={result.username}
                />
                <Stack
                  direction="row"
                  style={{
                    float: "right",
                    paddingBottom: "10px",
                  }}
                >
                  <FriendRequest
                    username={result.username}
                    profile={Profile}
                    key={result.id}
                  />
                </Stack>
              </Card>
            ))
          : null}
      </div>
    </Container>
  );
}
