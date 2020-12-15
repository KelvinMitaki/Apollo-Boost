import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Query {
    user: User!
  }
  type User {
    username: String!
    email: String!
  }
`;
