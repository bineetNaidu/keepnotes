import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useMutation } from '@apollo/client';
import useStore from '../lib/store';
import { CREATE_NOTE } from '../lib/queryUtils/createNote';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function CreateNoteForm() {
  const classes = useStyles();
  const history = useHistory();
  const [title, handleTitle, resetTitle] = useForm('');
  const [details, handleDetails, resetDetail] = useForm('');
  const s = useStore();

  const [createNote] = useMutation(CREATE_NOTE, {
    context: {
      headers: {
        Authorization: `Bearer ${s.token}`,
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title && !details) return;

    const { data, errors } = await createNote({
      variables: { title, details },
    });

    if (!errors && data) {
      const note = data.createNote;
      s.addNote({
        authorId: note.authorId,
        created_at: note.created_at,
        details: note.details,
        id: note.id,
        title: note.title,
      });

      resetTitle();
      resetDetail();

      history.push('/dashboard');
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={handleTitle}
          value={title}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          className={classes.field}
          onChange={handleDetails}
          value={details}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
        />

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Create
        </Button>
      </form>
    </Container>
  );
}
