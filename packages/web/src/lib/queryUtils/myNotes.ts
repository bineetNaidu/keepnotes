import gql from 'graphql-tag';

export const MY_NOTES = gql`
  {
    myNotes {
      id
      title
      details
      created_at
    }
  }
`;
