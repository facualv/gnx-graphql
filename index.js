const express = require("express");
const { PORT, MONGO_URI } = require("./src/config");
const mongoose = require("mongoose");
const gnx = require("@simtlix/gnx");
const graphqlHTTP = require("express-graphql");
const types = require("./src/types");
const { NotFoundMiddleware, ErrorMiddleware } = require("./src/middlewares");
const server = express();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected...");
    server.listen(PORT, () => {
      console.log(`Server runnnin at http://localhost:${PORT}/ `);
    });
  })
  .catch((err) => console.log(err));

const includedTypes = Object.values(types);
const schema = gnx.createSchema(includedTypes, includedTypes);

server.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
server.use(NotFoundMiddleware, ErrorMiddleware);
