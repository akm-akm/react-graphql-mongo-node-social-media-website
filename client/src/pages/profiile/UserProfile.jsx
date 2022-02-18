import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
export default function UserProfile() {
    return (
      <></>
  );
}
const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phone
      address
      role
      createdAt
    }
  }
`;