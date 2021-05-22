import { gql } from '@apollo/client';

export const CREATE_NOTE = gql`
  mutation ($title: String!, $details: String!) {
    createNote(title: $title, details: $details) {
      id
      title
      details
      authorId
      created_at
    }
  }
`;
