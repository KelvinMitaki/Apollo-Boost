import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signupUser(
      data: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`;
