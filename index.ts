import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { User } from "./models/User";
import { Recipe } from "./models/Recipe";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => ({
    User,
    Recipe,
    ...ctx
  })
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

if (!process.env.MONGO_URI) {
  throw new Error("Uri must be provided");
}

const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("connected to db");
  } catch (error) {
    console.log({ error });
  }
};

mongooseConnect();

app.listen(PORT, () =>
  console.log(`server started on port ${PORT}${server.graphqlPath}`)
);
