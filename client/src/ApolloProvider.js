import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
const { setContext } = require("apollo-link-context");
const httpLink = createHttpLink({
  uri: "http://localhost:5200/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("JWTTOKEN");
  return {
    headers: {   
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
