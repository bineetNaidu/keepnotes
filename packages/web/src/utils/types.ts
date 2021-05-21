export interface StateModel {
  token: string | null;
  user: User | null;
  myNotes: Note[];
  login: (token: string, data: User) => void;
  logout: () => void;
  setNotes: (data: Note[]) => void;
  addNote: (data: Note) => void;
  deleteNote: (id: string) => void;
}

export interface User {
  id: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  details: string;
  created_at: Date;
  authorId: number | string;
}
