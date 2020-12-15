import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Query {
    user: User!
  }
  type Mutation {
    addRecipe(data: RecipeInput!): Recipe!
    addUser(data: UserInput!): User!
  }
  input RecipeInput {
    name: String!
    category: String!
    description: String!
    instructions: String!
    user: String!
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  type User {
    username: String!
    email: String!
    password: String!
    createdAt: String!
    favorites: [Recipe!]!
  }
  type Recipe {
    name: String!
    category: String!
    description: String!
    instructions: String!
    likes: Int
    user: User!
  }
`;
