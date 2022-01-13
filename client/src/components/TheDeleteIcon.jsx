import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TheDeleteIcon({ postId, commentId }) {
  const [deletePostOrMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    update(proxy,r) {
      console.log(r);
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <div>
      <DeleteIcon onClick={deletePostOrMutation} />
    </div>
  );
}
const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($commentId: ID!, $postId: ID!) {
    deleteComment(commentID: $commentId, postID: $postId) {
     id
     commentCount
      comment {
        id

        body
      }
    }
  }
`;
