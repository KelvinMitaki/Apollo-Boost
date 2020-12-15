import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Query {
    user: User!
    getAllRecipes: [Recipe!]!
  }
  type Mutation {
    addRecipe(data: RecipeInput!): Recipe!
    signupUser(data: UserInput!): Token!
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
    _id: ID!
  }
  type Recipe {
    name: String!
    category: String!
    description: String!
    instructions: String!
    likes: Int
    user: User!
    _id: ID!
  }
  type Token {
    token: String!
  }
`;
