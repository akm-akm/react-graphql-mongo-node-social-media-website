const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./graphql/typeDef");
const resolvers = require("./graphql/resolvers");
const port = process.env.PORT || 5200;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
