import { gql } from '@apollo/client';

export const UPDATE_NOTE = gql`
  mutation ($id: ID!, $title: String, $details: String) {
    updateNote(id: $id, data: { title: $title, details: $details }) {
      id
      title
      details
      authorId
      created_at
    }
  }
`;
