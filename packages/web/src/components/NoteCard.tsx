import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import { Note } from '../utils/types';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note: Note) => {
      // if (note.category == 'work') {
      //   return yellow[700];
      // }
      // if (note.category == 'money') {
      //   return green[500];
      // }
      // if (note.category == 'todos') {
      //   return pink[500];
      // }
      return blue[500];
    },
  },
});

interface Props {
  note: Note;
  handleDelete: (id: string) => void;
}

export const NoteCard: FC<Props> = ({ note, handleDelete }) => {
  const classes = useStyles(note);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {/* {note.category[0].toUpperCase()} */}
              {note.title}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
