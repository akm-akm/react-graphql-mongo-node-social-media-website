import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Post from "./post";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
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
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import LocationOn from "@mui/icons-material/LocationOn";
import Edit from "@mui/icons-material/Edit";

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

export default function Home() {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm">
      <Card>
        <Box sx={{ p: 2, display: "flex" }}>
          <Avatar variant="rounded" src="avatar1.jpg" />
          <Stack spacing={0.5}>
            <Typography fontWeight={700}>Michael Scott</Typography>
            <Typography variant="body2" color="text.secondary">
              <LocationOn sx={{ color: grey[500] }} /> Scranton, PA
            </Typography>
          </Stack>
          <IconButton>
            <Edit sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1, bgcolor: "background.default" }}
        ></Stack>
      </Card>
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
            title="Aditya Kumar Mandal"
            subheader="AKM"
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
                maxRows={9}
                value={value}
                onChange={handleChange}
              />
            </div>
            <Stack
              direction="row"
              style={{
                float: "right",
              }}
            >
              <Button mt={100} variant="contained" endIcon={<SendIcon />}>
                Post
              </Button>
            </Stack>
          </Box>

          <CardActions disableSpacing>
            <IconButton aria-label="like">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="like">
              <ChatBubbleIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
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
