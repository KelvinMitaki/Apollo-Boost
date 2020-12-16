import { gql } from "@apollo/client";

export const SIGN_IN_USER = gql`
  mutation SigninUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;
