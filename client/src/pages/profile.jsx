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

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      commentCount
      likeCount
      comment {
        body
        id
        username
        createdAt
      }
      like {
        id
        username
        createdAt
      }
    }
  }
`;

export default function Profile() {
  const [error, seterror] = React.useState(undefined);
  const addNewPost = (event) => {
    setpost({ ...post, body: event.target.value });
  };
  const [post, setpost] = useState({
    body: "",
  });
  const [addPost, { loadingCreatePost }] = useMutation(CREATE_POST, {
    update(proxy, { data: { createPost: post } }) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      data.getPosts = [post, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      setpost({ body: "" });
    },
    onError(err) {
      console.log(typeof { post });
      seterror(err.graphQLErrors[0]);
      console.log(error);
    },
    variables: post,
  });
  const { user } = React.useContext(AuthContext);

  const uploadNewPost = (event) => {
    console.log(post);
    event.preventDefault();
    addPost();
  };

  const { loading, errorfetch, data } = useQuery(FETCH_POSTS_QUERY);
  if (loading) return <p>Loading...</p>;

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
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                P
              </Avatar>
            }
            title={user.name}
            subheader={user.username}
          />
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
                label="Write Something"
                multiline
                name="body"
                maxRows={9}
                value={post.body}
                onChange={addNewPost}
              />
            </div>
            <Stack
              direction="row"
              style={{
                float: "right",
              }}
            >
              <Button
                mt={100}
                onClick={uploadNewPost}
                type="submit"
                disabled={post.body.trim() === ""}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Post
              </Button>
            </Stack>
          </Box>
        </Card>
      </div>
      <div mt={100}>
        {data.getPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
}

const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      comment {
        id
        body
        username
        createdAt
      }
      commentCount
      like {
        id
        username
      }
      likeCount
    }
  }
`;
