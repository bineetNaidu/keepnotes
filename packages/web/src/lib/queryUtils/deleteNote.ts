import { gql } from '@apollo/client';

export const DELETE_NOTE = gql`
  mutation ($id: ID!) {
    deleteNote(id: $id)
  }
`;
