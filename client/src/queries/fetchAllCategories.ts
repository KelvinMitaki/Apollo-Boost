import { gql } from "@apollo/client";

export const FETCH_ALL_CATEGORIES = gql`
  query {
    getAllRecipes {
      name
      category
      description
      instructions
      likes
      _id
    }
  }
`;
