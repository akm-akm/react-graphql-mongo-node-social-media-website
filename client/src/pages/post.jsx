import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Badge, Button, Divider, Stack } from "@mui/material";
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
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            <FavoriteIcon />
          </Badge>
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Badge badgeContent={post.commentCount} color="secondary">
            <ChatBubbleIcon />
          </Badge>
        </ExpandMore>
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
                variant="standard"
                sx={{
                  width: "60%",
                  paddingRight: "28px",
                }}
              />
              <Button size="small" variant="contained" endIcon={<SendIcon />}>
                comment
              </Button>
            </Box>
          </Box>
          {post.comment.map((comment, id) => (
            <Box sx={{ "& > :not(style)": { m: 1, width: "536px" } }}>
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
                <IconButton aria-label="like">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
