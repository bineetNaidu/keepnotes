import { useMemo } from 'react';
import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';
import { NoteCard } from './NoteCard';
import { useLazyQuery, useMutation } from '@apollo/client';
import useStore from '../lib/store';
import { DELETE_NOTE } from '../lib/queryUtils/deleteNote';
import { MY_NOTES } from '../lib/queryUtils/myNotes';

export default function Notes() {
  const store = useStore();

  const headers = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    }),
    [store.token]
  );

  const [deleteNote] = useMutation(DELETE_NOTE);
  const [, { error, data, loading }] = useLazyQuery(MY_NOTES, {
    context: {
      ...headers,
    },
  });

  const handleDelete = async (id: string) => {
    const { data, errors } = await deleteNote({
      variables: { id },
      context: {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      },
    });

    if (!errors && data.deleteNote) {
      store.deleteNote(id);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!error && data) {
    store.setNotes(data.myNotes);
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {store.myNotes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
