import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      createdAt
      _id
      favorites {
        name
        category
        description
        instructions
        likes
        _id
      }
    }
  }
`;
