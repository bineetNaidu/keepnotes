import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation ($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;
