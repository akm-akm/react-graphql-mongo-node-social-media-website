import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey, pink, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Badge, Button, Divider, Stack, SvgIcon } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOn from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Edit from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import TheDeleteIcon from "../components/TheDeleteIcon";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ post }) {
  const { user } = React.useContext(AuthContext);
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [like, setLike] = React.useState(false);
  React.useEffect(() => {
    setLike(post.like.find((like) => like.username === user.username));
  }, [post, user]);

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      body: comment,
      postId: post.id,
    },
    update(proxy, result) {
      setComment("");
    },
  });

  const [createLike] = useMutation(CREATE_LIKE, {
    variables: { postId: post.id },
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function Heart(props) {
    return (
      <SvgIcon {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
        </svg>
      </SvgIcon>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 700,
        marginBottom: 5,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.username[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.username}
        subheader={moment(post.createdAt).fromNow()}
      />
      <Divider />
      <CardContent>
        <Typography>{post.body}</Typography>
      </CardContent>
      <Divider />

      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <Badge badgeContent={post.likeCount} color="secondary">
            <Heart
              onClick={createLike}
              sx={user && like ? { color: red[700] } : { color: grey[600] }}
            />
          </Badge>
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Badge badgeContent={post.commentCount} color="secondary">
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ChatBubbleIcon />
          </ExpandMore>
        </Badge>
      </CardActions>
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ "& > :not(style)": { m: 1, width: "536px" } }}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 0.5, my: 1 }} />
              <TextField
                id="input-with-sx"
                label="Write a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="standard"
                sx={{
                  width: "60%",
                  paddingRight: "28px",
                }}
              />
              <Button
                size="small"
                onClick={createComment}
                disabled={comment.length === 0}
                variant="contained"
                endIcon={<SendIcon />}
              >
                comment
              </Button>
            </Box>
          </Box>
          {post.comment.map((comment, id) => (
            <Box key={id} sx={{ "& > :not(style)": { m: 1, width: "536px" } }}>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 0.5, my: 1 }}
                />
                <TextField
                  id="input-with-sx"
                  label={comment.username}
                  value={comment.body}
                  variant="standard"
                  multiline
                  disabled
                  maxRows={9}
                  sx={{
                    width: "82%",
                    verticalAlign: "text-top",
                    fontSize: "8px",
                    paddingRight: "2px",
                    border: "none",
                  }}
                />

                {user && user.username === comment.username ? (
                  <IconButton aria-label="like">
                    <TheDeleteIcon postId={post.id} commentId={id} />
                  </IconButton>
                ) : null}
              </Box>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

const CREATE_LIKE = gql`
  mutation CreateLike($postId: ID!) {
    createLike(postID: $postId) {
      id
      likeCount
      like {
        id
        username
        createdAt
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postID: $postId, body: $body) {
      id
      commentCount
      comment {
        body
        id
        createdAt
        username
      }
    }
  }
`;
