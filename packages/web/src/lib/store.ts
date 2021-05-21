import create from 'zustand';
import { Note, StateModel, User } from '../utils/types';

const useStore = create<StateModel>((set) => ({
  // default States
  token: null,
  user: null,
  myNotes: [],
  // Set States
  login: (token: string, data: User) => set((state) => ({ user: data, token })),
  logout: () => set((state) => ({ user: null, token: null, myNotes: [] })),
  setNotes: (data: Note[]) => set((state) => ({ myNotes: data })),
  addNote: (data: Note) =>
    set((state) => ({ myNotes: [...state.myNotes, data] })),
  deleteNote: (id: string) =>
    set((state) => ({
      myNotes: state.myNotes.filter((note) => note.id !== id),
    })),
}));

export default useStore;
